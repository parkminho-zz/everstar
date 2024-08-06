package com.b101.everStarBackChat.global.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

	private final KafkaTemplate<String, String> kafkaTemplate;

	public void sendMessage(String message) {
		kafkaTemplate.send("topic_name", message);
	}
}
