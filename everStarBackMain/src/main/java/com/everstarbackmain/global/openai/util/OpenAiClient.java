package com.everstarbackmain.global.openai.util;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;
import com.everstarbackmain.global.openai.model.ChatGPTRequest;
import com.everstarbackmain.global.openai.model.ChatGPTResponse;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.global.config.OpenAiConfig;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.openai.model.Content;
import com.everstarbackmain.global.openai.model.ImageGPTRequest;
import com.everstarbackmain.global.openai.model.ImageGPTResponse;
import com.everstarbackmain.global.openai.model.OpenAiPrompt;
import com.everstarbackmain.global.openai.model.TextImageGPTRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class OpenAiClient {

	private final RestTemplate restTemplate;
	private final OpenAiConfig openAiConfig;

	public String analysisTotalSentiment(SentimentAnalysis sentimentAnalysis) {
		String userInput = parseAnalysisToJsonString(sentimentAnalysis);

		ChatGPTRequest request = ChatGPTRequest.createChatGPTRequest(openAiConfig.getModel(),
			OpenAiPrompt.ANALYSIS_TOTAL_SENTIMENT_PROMPT.getPrompt(), userInput);
		ChatGPTResponse response = restTemplate.postForObject(openAiConfig.getApiUrl(), request, ChatGPTResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		String result = response.getChoices().get(0).getMessage().getContent();
		log.info("main server - openai api total sentiment analysis response : {}", result);

		return result;
	}

	public String writePetLetterAnswer(UserLetter userLetter) {
		String prompt = createPetLetterAnswerPrompt(userLetter);

		ChatGPTRequest request = new ChatGPTRequest(openAiConfig.getModel(), prompt);
		ChatGPTResponse response = restTemplate.postForObject(openAiConfig.getApiUrl(), request, ChatGPTResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		String result = response.getChoices().get(0).getMessage().getContent();
		log.info("main server - openai api write pet letter answer response : {}", result);

		return result;
	}

	public String writePetLetter(List<UserLetter> userLetters, Pet pet) {
		String contents = combineLetters(userLetters);
		String prompt = createPetLetterPrompt(contents, pet);

		ChatGPTRequest request = new ChatGPTRequest(openAiConfig.getModel(), prompt);
		ChatGPTResponse response = restTemplate.postForObject(openAiConfig.getApiUrl(), request, ChatGPTResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		String result = response.getChoices().get(0).getMessage().getContent();
		log.info("main server - openai api write pet letter response : {}", result);

		return result;
	}

	private String parseAnalysisToJsonString(SentimentAnalysis sentimentAnalysis) {
		return "{"
			+ "\"1주차 감정분석 결과\": " + sentimentAnalysis.getWeek1Result() + ","
			+ "\"2주차 감정분석 결과\": " + sentimentAnalysis.getWeek2Result() + ","
			+ "\"3주차 감정분석 결과\": " + sentimentAnalysis.getWeek3Result() + ","
			+ "\"4주차 감정분석 결과\": " + sentimentAnalysis.getWeek4Result() + ","
			+ "\"5주차 감정분석 결과\": " + sentimentAnalysis.getWeek5Result() + ","
			+ "\"6주차 감정분석 결과\": " + sentimentAnalysis.getWeek6Result() + ","
			+ "\"7주차 감정분석 결과\": " + sentimentAnalysis.getWeek7Result()
			+ "}";
	}

	private String combineLetters(List<UserLetter> userLetters) {
		return userLetters.stream()
			.map(UserLetter::getContent)
			.collect(Collectors.joining());
	}

	private String createPetLetterAnswerPrompt(UserLetter userLetter) {
		Pet pet = userLetter.getPet();
		String petName = pet.getName();

		User user = pet.getUser();
		String userName = user.getUserName();

		String letterContent = userLetter.getContent();

		String prompt = String.format(OpenAiPrompt.WRITE_PET_LETTER_ANSWER_PROMPT.getPrompt(), petName, petName, letterContent, petName,
			userName);
		return prompt;
	}

	private String createPetLetterPrompt(String content, Pet pet) {
		String petName = pet.getName();
		User user = pet.getUser();
		String userName = user.getUserName();

		String prompt = String.format(OpenAiPrompt.WRITE_PET_LETTER_ANSWER_PROMPT.getPrompt(), petName, petName, content, petName, userName);
		return prompt;
	}

	public String writePetTextToTextAnswer(User user, Pet pet, List<String> petPersonalities, Quest quest, QuestAnswer questAnswer) {
		String prompt = createPetTextToTextAnswerPrompt(user, pet, petPersonalities, quest, questAnswer);

		ChatGPTRequest request = new ChatGPTRequest(openAiConfig.getModel(), prompt);
		ChatGPTResponse response = restTemplate.postForObject(openAiConfig.getApiUrl(), request, ChatGPTResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		String result = response.getChoices().get(0).getMessage().getContent();
		log.info("main server - openai api pet text answer response : {}", result);

		return result;
	}

	private String createPetTextToTextAnswerPrompt(User user, Pet pet, List<String> petPersonalities, Quest quest, QuestAnswer questAnswer) {
		String petName = pet.getName();
		String personalities = String.join(", ", petPersonalities);
		String prompt = String.format(OpenAiPrompt.WRITE_PET_TEXT_TO_TEXT_ANSWER_PROMPT.getPrompt(), petName, petName,
			quest.getContent(), questAnswer.getContent(), petName, pet.getRelationship(), personalities, user.getUserName());
		return prompt;
	}

	public String writePetTextImageToTextAnswer(User user, Pet pet, List<String> petPersonalities, Quest quest,
		QuestAnswer questAnswer, String imageUrl) {
		String prompt = createPetTextImageToTextAnswerPrompt(user, pet, petPersonalities, quest, questAnswer);

		List<Content> contents = new ArrayList<>();
		contents.add(Content.createTextContent(prompt));
		contents.add(Content.createImageContent(imageUrl));

		TextImageGPTRequest request = new TextImageGPTRequest(openAiConfig.getModel(), contents);
		ChatGPTResponse response = restTemplate.postForObject(openAiConfig.getApiUrl(), request, ChatGPTResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		String result = response.getChoices().get(0).getMessage().getContent();
		log.info("main server - openai api pet text image answer response : {}", result);

		return result;
	}

	private String createPetTextImageToTextAnswerPrompt(User user, Pet pet, List<String> petPersonalities, Quest quest, QuestAnswer questAnswer) {
		String petName = pet.getName();
		String personalities = String.join(", ", petPersonalities);
		String prompt = String.format(OpenAiPrompt.WRITE_PET_TEXT_IMAGE_TO_TEXT_ANSWER_PROMPT.getPrompt(), petName, petName,
			quest.getContent(), questAnswer.getContent(), petName, pet.getRelationship(), personalities, user.getUserName());
		return prompt;
	}

	public String writePetTextToImageAnswer(Pet pet, Quest quest, QuestAnswer questAnswer) {
		String prompt = createPetTextToImageAnswerPrompt(pet, quest, questAnswer);

		ImageGPTRequest request = new ImageGPTRequest(prompt);
		ImageGPTResponse response = restTemplate.postForObject(openAiConfig.getCreateImageUrl(), request, ImageGPTResponse.class);

		if (response == null || response.getData() == null || response.getData().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		return response.getData().get(0).getB64_json();
	}

	private String createPetTextToImageAnswerPrompt(Pet pet, Quest quest, QuestAnswer questAnswer) {
		String prompt = String.format(OpenAiPrompt.WRITE_PET_TEXT_TO_IMAGE_ANSWER_PROMPT.getPrompt(),
			quest.getContent(), questAnswer.getContent(), pet.getSpecies());
		return prompt;
	}
}

