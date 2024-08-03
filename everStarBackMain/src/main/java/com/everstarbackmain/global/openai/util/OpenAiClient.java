package com.everstarbackmain.global.openai.util;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.everstarbackmain.global.openai.model.ChatGPTRequest;
import com.everstarbackmain.global.openai.model.ChatGPTResponse;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.global.config.OpenAiConfig;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class OpenAiClient {

	private final RestTemplate restTemplate;
	private final OpenAiConfig openAiConfig;
	private final String ANALYSIS_TOTAL_SENTIMENT_PROMPT =
		"7주간의 각 주차별 감정 분석 결과를 입력으로 받아서 사용자의 감정이 어떻게 변화하였는지를 알려줍니다. " +
			"0에 가까울수록 부정적인 감정을 겪었고, 100에 가까울수록 긍정적인 감정을 겪었습니다." +
			"몇주차인지는 언급하지 않고, 자연스러운 흐름으로 일상생활과 연관지어서 부드러운 문장으로 알려줍니다. 최대 3문장으로 요약해서 알려줍니다.";

	private final String WRITE_PET_LETTER_ANSWER_PROMPT =
		"당신의 애완동물 %s가 보내는 답장입니다. 편지를 분석하여 %s의 관점에서 감동적이고 공감할 수 있는 답장을 작성해 주세요.\n\n" +
			"편지 내용: \"%s\"\n\n" +
			"애완동물 이름: \"%s\"\n" +
			"작성자 이름: \"%s\"\n\n" +
			"답장을 작성할 때 고려 사항:\n" +
			"1. 애완동물이 직접 말하는 것처럼 작성해 주세요.\n" +
			"2. 편지에 언급된 추억에 감사해 주세요.\n" +
			"3. 사랑의 메시지를 전달해 주세요.\n" +
			"4. 따뜻하고 진심 어린 톤으로 작성해 주세요.\n" +
			"5. 너무 딱딱하지 않게 문장이 부드럽게 작성해주세요\n" +
			"6. 최대 varchar(255)로 글자를 작성해 주세요.\n\n" +
			"감사합니다.";

	private final String WRITE_PET_LETTER_PROMPT =
		"당신의 애완동물 %s가 보내는 답장입니다. 편지를 분석하여 %s의 관점에서 감동적이고 공감할 수 있는 답장을 작성해 주세요.\n\n" +
			"편지 내용: \"%s\"\n\n" +
			"애완동물 이름: \"%s\"\n" +
			"작성자 이름: \"%s\"\n\n" +
			"답장을 작성할 때 고려 사항:\n" +
			"1. 애완동물이 직접 말하는 것처럼 작성해 주세요.\n" +
			"2. 편지에 언급된 추억에 감사해 주세요.\n" +
			"3. 사랑의 메시지를 전달해 주세요.\n" +
			"4. 따뜻하고 진심 어린 톤으로 작성해 주세요.\n" +
			"5. 너무 딱딱하지 않게 문장이 부드럽게 11살에서 12살이 작성한 것 처럼작성해 주세요.\n" +
			"6. 최대 varchar(255)로 글자를 작성해 주세요.\n\n" +
			"감사합니다.";

	public String analysisTotalSentiment(SentimentAnalysis sentimentAnalysis) {
		String userInput = parseAnalysisToJsonString(sentimentAnalysis);

		ChatGPTRequest request = ChatGPTRequest.createChatGPTRequest(openAiConfig.getModel(),
			ANALYSIS_TOTAL_SENTIMENT_PROMPT, userInput);
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
		log.info("main server - openai api total sentiment analysis response : {}", result);

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
		log.info("main server - openai api total sentiment analysis response : {}", result);

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

		String prompt = String.format(WRITE_PET_LETTER_ANSWER_PROMPT, petName, petName, letterContent, petName,
			userName);
		return prompt;
	}

	private String createPetLetterPrompt(String content, Pet pet) {
		String petName = pet.getName();
		User user = pet.getUser();
		String userName = user.getUserName();

		String prompt = String.format(WRITE_PET_LETTER_ANSWER_PROMPT, petName, petName, content, petName, userName);
		return prompt;
	}

}

