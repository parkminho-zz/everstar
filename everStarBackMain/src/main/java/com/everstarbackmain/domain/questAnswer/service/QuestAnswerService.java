package com.everstarbackmain.domain.questAnswer.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.everstarbackmain.domain.aiAnswer.model.AiAnswer;
import com.everstarbackmain.domain.aiAnswer.model.AiAnswerType;
import com.everstarbackmain.domain.aiAnswer.repository.AiAnswerRepository;
import com.everstarbackmain.domain.aiAnswer.requestdto.CreateAiAnswerRequestDto;
import com.everstarbackmain.domain.memorialBook.util.MemorialBookScheduler;
import com.everstarbackmain.domain.notification.util.NotificationUtil;
import com.everstarbackmain.domain.pet.repository.PetPersonalityRepository;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.domain.quest.model.QuestType;
import com.everstarbackmain.domain.quest.repository.QuestRepository;
import com.everstarbackmain.domain.quest.util.QuestScheduler;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswerTypeNo;
import com.everstarbackmain.domain.questAnswer.requestDto.CreateAnswerRequestDto;
import com.everstarbackmain.global.diffusionai.util.DiffusionAiClient;
import com.everstarbackmain.global.openai.util.OpenAiClient;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.questAnswer.repository.QuestAnswerRepository;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysisResult;
import com.everstarbackmain.domain.sentimentAnalysis.repository.SentimentAnalysisRepository;
import com.everstarbackmain.domain.sentimentAnalysis.util.NaverCloudClient;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;
import com.everstarbackmain.global.util.S3UploadUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class QuestAnswerService {

	private final QuestRepository questRepository;
	private final QuestAnswerRepository questAnswerRepository;
	private final AiAnswerRepository aiAnswerRepository;
	private final PetRepository petRepository;
	private final PetPersonalityRepository petPersonalityRepository;
	private final SentimentAnalysisRepository sentimentAnalysisRepository;
	private final MemorialBookScheduler memorialBookScheduler;
	private final QuestScheduler questScheduler;
	private final NaverCloudClient naverCloudClient;
	private final OpenAiClient openAiClient;
	private final DiffusionAiClient diffusionAiClient;
	private final S3UploadUtil s3UploadUtil;
	private final NotificationUtil notificationUtil;

	@Transactional
	public void createQuestAnswer(Authentication authentication, Long petId, Long questId,
		CreateAnswerRequestDto requestDto, MultipartFile imageFile) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();

		Pet pet = petRepository.findByIdAndUserAndIsDeleted(petId,user, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		if (pet.getIsQuestCompleted()) {
			throw new ExceptionResponse(CustomException.ALREADY_COMPLETED_QUEST_EXCEPTION);
		}

		// TODO: pet의 quest index가 요청 받은 quest index와 일치하는지 검증 및 예외처리

		Quest quest = questRepository.findById(questId)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_QUEST_EXCEPTION));

		questScheduler.scheduleNextDayQuest(user, petId);

		if (requestDto.getType().equals(QuestType.TEXT.getType())) {
			QuestAnswer questAnswer = QuestAnswer.createTextQuestAnswer(pet, quest, requestDto);
			questAnswerRepository.save(questAnswer);
			plusPetQuestIndexByTextType(user, pet, quest, questAnswer);
			return;
		}

		if (requestDto.getType().equals(QuestType.TEXT_IMAGE.getType())) {
			String imageUrl = s3UploadUtil.saveFile(imageFile);
			QuestAnswer questAnswer = QuestAnswer.createTextImageQuestAnswer(pet, quest, requestDto, imageUrl);
			questAnswerRepository.save(questAnswer);
			plusPetQuestIndexByImageType(user, pet, quest, questAnswer, imageUrl, imageFile);
			return;
		}

		String imageUrl = s3UploadUtil.saveFile(imageFile);
		QuestAnswer questAnswer = QuestAnswer.createImageQuestAnswer(pet, quest, requestDto, imageUrl);
		questAnswerRepository.save(questAnswer);
		plusPetQuestIndexByImageType(user, pet, quest, questAnswer, imageUrl, imageFile);

	}

	private void plusPetQuestIndexByTextType(User user, Pet pet, Quest quest, QuestAnswer questAnswer) {
		pet.plusQuestIndex();
		int petQuestIndex = pet.getQuestIndex();

		if (petQuestIndex % 7 == 0) {
			analyseWeeklyQuestAnswer(pet.getId(), petQuestIndex);
		}

		if (petQuestIndex == 49) {
			memorialBookScheduler.scheduleMemorialBookActivation(user, pet.getId());
			analysisTotalQuestAnswer(pet.getId());
		}

		requestAiAnswerByTextType(user, pet, quest, questAnswer);
	}

	private void plusPetQuestIndexByImageType(User user, Pet pet, Quest quest, QuestAnswer questAnswer, String imageUrl,
		MultipartFile imageFile) {
		pet.plusQuestIndex();
		int petQuestIndex = pet.getQuestIndex();

		if (petQuestIndex % 7 == 0) {
			analyseWeeklyQuestAnswer(pet.getId(), petQuestIndex);
		}

		if (petQuestIndex == 49) {
			memorialBookScheduler.scheduleMemorialBookActivation(user, pet.getId());
			analysisTotalQuestAnswer(pet.getId());
		}

		requestAiAnswerByImageType(user, pet, quest, questAnswer, imageUrl, imageFile);
	}

	private void analyseWeeklyQuestAnswer(Long petId, int petQuestIndex) {
		List<String> answerContents = questAnswerRepository.findContentByPetIdAndSpecificQuestIdsAndIsDeleted(petId,
			petQuestIndex - 3, petQuestIndex, false);

		String weeklyAnswerContent = answerContents.parallelStream()
			.collect(Collectors.joining(""));

		SentimentAnalysisResult sentimentAnalysisResult = naverCloudClient.analyseSentiment(weeklyAnswerContent);
		SentimentAnalysis sentimentAnalysis = sentimentAnalysisRepository.findByPetId(petId)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_SENTIMENT_ANALYSIS_EXCEPTION));

		sentimentAnalysis.addWeekResult(sentimentAnalysisResult.calculateAnalysis(), petQuestIndex / 7);
	}

	private void analysisTotalQuestAnswer(Long petId) {
		SentimentAnalysis sentimentAnalysis = sentimentAnalysisRepository.findByPetId(petId)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_SENTIMENT_ANALYSIS_EXCEPTION));

		sentimentAnalysis.addTotalResult(openAiClient.analysisTotalSentiment(sentimentAnalysis));
	}

	private void requestAiAnswerByTextType(User user, Pet pet, Quest quest, QuestAnswer questAnswer) {
		Long questId = quest.getId();
		List<String> personalities = petPersonalityRepository.findPersonalityValuesByPetIdAndIsDeleted(
			pet.getId(), false);

		QuestAnswerTypeNo.findTypeByQuestNumber(questId).ifPresentOrElse(type -> {
			if (type.equals(QuestAnswerTypeNo.TEXT_TO_TEXT.getType())) {
				String aiAnswerResponse = openAiClient.writePetTextToTextAnswer(user, pet, personalities, quest,
					questAnswer);
				AiAnswer aiAnswer = AiAnswer.createAiAnswer(pet, quest,
					CreateAiAnswerRequestDto.createTextAiAnswerRequestDto(aiAnswerResponse,
						AiAnswerType.TEXT.getType()));
				aiAnswerRepository.save(aiAnswer);
			}

			if (type.equals(QuestAnswerTypeNo.TEXT_TO_IMAGE_ART.getType())) {
				String encodedAiAnswerResponse = openAiClient.writePetTextToImageAnswer(pet, quest, questAnswer);
				String uploadedImageUrl = s3UploadUtil.uploadS3ByEncodedFile(encodedAiAnswerResponse);
				AiAnswer aiAnswer = AiAnswer.createAiAnswer(pet, quest,
					CreateAiAnswerRequestDto.createImageAiAnswerRequestDto(uploadedImageUrl,
						AiAnswerType.IMAGE.getType()));
				aiAnswerRepository.save(aiAnswer);

				notificationUtil.sendImageAiAnswerNotification(user, uploadedImageUrl);
			}

		}, () -> {
		});
	}

	private void requestAiAnswerByImageType(User user, Pet pet, Quest quest, QuestAnswer questAnswer, String imageUrl,
		MultipartFile imageFile) {
		Long questId = quest.getId();
		List<String> personalities = petPersonalityRepository.findPersonalityValuesByPetIdAndIsDeleted(
			pet.getId(), false);

		QuestAnswerTypeNo.findTypeByQuestNumber(questId).ifPresentOrElse(type -> {
			if (type.equals(QuestAnswerTypeNo.TEXT_IMAGE_TO_TEXT.getType())) {
				String aiAnswerResponse = openAiClient.writePetTextImageToTextAnswer(user, pet, personalities, quest,
					questAnswer, imageUrl);
				AiAnswer aiAnswer = AiAnswer.createAiAnswer(pet, quest,
					CreateAiAnswerRequestDto.createTextAiAnswerRequestDto(aiAnswerResponse,
						AiAnswerType.TEXT.getType()));
				aiAnswerRepository.save(aiAnswer);
			}

			if (type.equals(QuestAnswerTypeNo.TEXT_IMAGE_TO_IMAGE_ART.getType()) ||
				type.equals(QuestAnswerTypeNo.TEXT_IMAGE_TO_IMAGE_PICTURE.getType())) {
				String responseImageUrl = diffusionAiClient.writePetTextImageToImageAnswer(questAnswer, imageUrl);

				byte[] imageBytes = downloadImage(responseImageUrl);

				MultipartFile decodedImageFile = new MockMultipartFile(
					"image",
					"image.png",
					"image/png",
					imageBytes
				);

				String uploadedImageUrl = s3UploadUtil.saveFile(decodedImageFile);
				AiAnswer aiAnswer = AiAnswer.createAiAnswer(pet, quest,
					CreateAiAnswerRequestDto.createImageAiAnswerRequestDto(uploadedImageUrl,
						AiAnswerType.IMAGE.getType()));
				aiAnswerRepository.save(aiAnswer);

				notificationUtil.sendImageAiAnswerNotification(user, imageUrl);
			}

		}, () -> {
		});
	}

	private byte[] downloadImage(String imageUrl) {
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<byte[]> response = restTemplate.exchange(imageUrl, HttpMethod.GET, null, byte[].class);
		return response.getBody();
	}

}
