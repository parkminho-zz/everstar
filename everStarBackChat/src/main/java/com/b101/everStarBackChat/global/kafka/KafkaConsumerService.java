package com.b101.everStarBackChat.global.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KafkaConsumerService {

	private final SimpMessagingTemplate messagingTemplate;

	@KafkaListener(topics = "topic_name", groupId = "group_id")
	public void listen(String message) {
		messagingTemplate.convertAndSend("/topic/messages", message);
	}
}