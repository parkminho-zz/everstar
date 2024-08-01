package com.everstarbackmain.domain.questAnswer.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.security.core.Authentication;

import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.domain.memorialBook.util.MemorialBookScheduler;
import com.everstarbackmain.domain.openai.util.OpenAiClient;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestDto.CreatePetRequestDto;
import com.everstarbackmain.domain.questAnswer.repository.QuestAnswerRepository;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysisResult;
import com.everstarbackmain.domain.sentimentAnalysis.repository.SentimentAnalysisRepository;
import com.everstarbackmain.domain.sentimentAnalysis.util.NaverCloudClient;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

@ExtendWith(MockitoExtension.class)
class QuestAnswerServiceTest {

	@InjectMocks
	private QuestAnswerService questAnswerService;

	@Mock
	private PetRepository petRepository;

	@Mock
	private MemorialBookScheduler memorialBookScheduler;

	@Mock
	private QuestAnswerRepository questAnswerRepository;

	@Mock
	private SentimentAnalysisRepository sentimentAnalysisRepository;

	@Mock
	private NaverCloudClient naverCloudClient;

	@Mock
	private OpenAiClient openAiClient;

	@Mock
	private TaskScheduler taskScheduler;


	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	private User user;
	private Pet pet;
	private MemorialBook memorialBook;
	private SentimentAnalysis sentimentAnalysis;
	private SentimentAnalysisResult sentimentAnalysisResult;

	@BeforeEach
	public void setup() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));
		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", "profileImageUrl", List.of("개구쟁이", "귀염둥이")));
		memorialBook = MemorialBook.createMemorialBook(pet);
		sentimentAnalysis = SentimentAnalysis.createSentimentAnalysis(pet);
		sentimentAnalysisResult = SentimentAnalysisResult.createSentimentAnalysisResult(0.1, 0.3, 0.6);
	}

	@Test
	@DisplayName("퀘스트_49일차_답변_생성_후_스케줄링_메서드_호출_테스트")
	public void 퀘스트_49일차_답변_생성_후_스케줄링_메서드_호출_테스트() {
		// given
		for (int i = 0; i < 48; i++) {
			pet.plusQuestIndex();
		}
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(pet));
		given(sentimentAnalysisRepository.findByPetId(anyLong())).willReturn(Optional.of(sentimentAnalysis));
		given(naverCloudClient.analyseSentiment(anyString())).willReturn(Optional.of(sentimentAnalysisResult).get());

		// when
		questAnswerService.createQuestAnswer(authentication, 1L);

		// then
		verify(memorialBookScheduler).scheduleMemorialBookActivation(user, 1L);
	}

	@Test
	@DisplayName("퀘스트_답변_분석_메서드_호출_테스트")
	public void 퀘스트_답변_분석_메서드_호출_테스트() {
		// given
		for (int i = 0 ; i < 6; i++) {
			pet.plusQuestIndex();
		}
		SentimentAnalysis sentimentAnalysis = mock(SentimentAnalysis.class);
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(pet));
		given(questAnswerRepository.findContentByPetIdAndSpecificQuestIdsAndIsDeleted(anyLong(), anyInt(), anyInt(), anyBoolean()))
			.willReturn(List.of("answer1", "answer2", "answer3", "answer4", "answer5", "answer6", "answer7"));
		given(naverCloudClient.analyseSentiment(anyString()))
			.willReturn(SentimentAnalysisResult.createSentimentAnalysisResult(0.1, 0.2, 0.7));
		given(sentimentAnalysisRepository.findByPetId(anyLong()))
			.willReturn(Optional.of(sentimentAnalysis));

		// when
		questAnswerService.createQuestAnswer(authentication, 1L);

		// then
		verify(naverCloudClient, times(1)).analyseSentiment(anyString());
		verify(sentimentAnalysisRepository, times(1)).findByPetId(anyLong());
		verify(sentimentAnalysis, times(1)).addWeekResult(anyDouble(), eq(1));
		assertNotNull(sentimentAnalysis.getWeek1Result());
	}

	@Test
	@DisplayName("네이버_감정분석_API_예외_처리_테스트")
	public void 네이버_감정분석_API_예외_처리_테스트() {
		// given
		for (int i = 0; i < 6; i++) {
			pet.plusQuestIndex();
		}

		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(pet));
		given(questAnswerRepository.findContentByPetIdAndSpecificQuestIdsAndIsDeleted(anyLong(), anyInt(), anyInt(), anyBoolean()))
			.willReturn(List.of("answer1", "answer2", "answer3", "answer4", "answer5", "answer6", "answer7"));
		given(naverCloudClient.analyseSentiment(anyString()))
			.willThrow(new ExceptionResponse(CustomException.NAVER_SENTIMENT_API_EXCEPTION));

		// when
		ExceptionResponse exceptionResponse = assertThrows(ExceptionResponse.class, () -> {
			questAnswerService.createQuestAnswer(authentication, 1L);
		});

		// then
		assertEquals(CustomException.NAVER_SENTIMENT_API_EXCEPTION, exceptionResponse.getCustomException());
	}

	@Test
	@DisplayName("감정분석_NOT_FOUND_예외_처리_테스트")
	public void 감정분석_NOT_FOUND_예외_처리_테스트() {
		// given
		for (int i = 0; i < 6; i++) {
			pet.plusQuestIndex();
		}

		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(pet));
		given(questAnswerRepository.findContentByPetIdAndSpecificQuestIdsAndIsDeleted(anyLong(), anyInt(), anyInt(), anyBoolean()))
			.willReturn(List.of("answer1", "answer2", "answer3", "answer4", "answer5", "answer6", "answer7"));
		given(naverCloudClient.analyseSentiment(anyString()))
			.willReturn(SentimentAnalysisResult.createSentimentAnalysisResult(0.1, 0.2, 0.7));
		given(sentimentAnalysisRepository.findByPetId(anyLong()))
			.willReturn(Optional.empty());

		// when
		ExceptionResponse exceptionResponse = assertThrows(ExceptionResponse.class, () -> {
			questAnswerService.createQuestAnswer(authentication, 1L);
		});

		// then
		assertEquals(CustomException.NOT_FOUND_SENTIMENT_ANALYSIS_EXCEPTION, exceptionResponse.getCustomException());
	}

	@Test
	@DisplayName("퀘스트_49일차_답변_생성_후_OPENAI_API_메서드_호출_테스트")
	public void 퀘스트_49일차_답변_생성_후_OPENAI_API_메서드_호출_테스트() {
		// given
		for (int i = 0; i < 48; i++) {
			pet.plusQuestIndex();
		}
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(pet));
		given(sentimentAnalysisRepository.findByPetId(anyLong())).willReturn(Optional.of(sentimentAnalysis));
		given(naverCloudClient.analyseSentiment(anyString())).willReturn(Optional.of(sentimentAnalysisResult).get());

		// when
		questAnswerService.createQuestAnswer(authentication, 1L);

		// then
		verify(openAiClient).analysisTotalSentiment(sentimentAnalysis);
	}

	@Test
	@DisplayName("퀘스트_49일차_답변_생성_후_OPENAI_API_EXCEPTION_발생_테스트")
	public void 퀘스트_49일차_답변_생성_후_OPENAI_API_EXCEPTION_발생_테스트() {
		// given
		for (int i = 0; i < 48; i++) {
			pet.plusQuestIndex();
		}
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(pet));
		given(sentimentAnalysisRepository.findByPetId(anyLong())).willReturn(Optional.of(sentimentAnalysis));
		given(naverCloudClient.analyseSentiment(anyString())).willReturn(Optional.of(sentimentAnalysisResult).get());
		given(openAiClient.analysisTotalSentiment(any(SentimentAnalysis.class)))
			.willThrow(new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION));

		// when
		ExceptionResponse exceptionResponse = assertThrows(ExceptionResponse.class, () -> {
			questAnswerService.createQuestAnswer(authentication, 1L);
		});

		// then
		assertEquals(CustomException.OPENAI_API_EXCEPTION, exceptionResponse.getCustomException());
	}

}