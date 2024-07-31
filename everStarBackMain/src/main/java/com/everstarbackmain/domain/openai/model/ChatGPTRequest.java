package com.everstarbackmain.domain.openai.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class ChatGPTRequest {

	private String model;
	private List<Message> messages = new ArrayList<>();

	public ChatGPTRequest(String model, String prompt) {
		this.model = model;
		this.messages.add(new Message("user", prompt));
	}

	public ChatGPTRequest(String model, String systemPrompt, String userPrompt) {
		this.model = model;
		this.messages.add(new Message("user", systemPrompt));
		this.messages.add(new Message("user", userPrompt));
	}
}