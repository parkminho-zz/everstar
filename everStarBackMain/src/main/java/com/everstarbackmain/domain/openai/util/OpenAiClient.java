package com.everstarbackmain.domain.openai.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.everstarbackmain.domain.openai.model.ChatGPTRequest;
import com.everstarbackmain.domain.openai.model.ChatGPTResponse;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class OpenAiClient {

	private final RestTemplate restTemplate;

	@Value("${openai.model}")
	private String model;

	@Value("${openai.api.url}")
	private String apiUrl;

	public String analysisTotalSentiment(SentimentAnalysis sentimentAnalysis) {
		String prompt = "7주간의 각 주차별 감정 분석 결과를 입력으로 받아서 사용자의 감정이 어떻게 변화하였는지를 알려줍니다. " +
			"0에 가까울수록 부정적인 감정을 겪었고, 100에 가까울수록 긍정적인 감정을 겪었습니다." +
			"몇주차인지는 언급하지 않고, 자연스러운 흐름으로 일상생활과 연관지어서 부드러운 문장으로 알려줍니다. 최대 3문장으로 요약해서 알려줍니다.";

		String userInput = parseAnalysisToJsonString(sentimentAnalysis);

		ChatGPTRequest request = new ChatGPTRequest(model, prompt, userInput);
		ChatGPTResponse response = restTemplate.postForObject(apiUrl, request, ChatGPTResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		String result = response.getChoices().get(0).getMessage().getContent();
		log.info(result);

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
}

