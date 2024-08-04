package com.everstarbackmain.domain.cheeringMessage.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.cheeringMessage.repository.CheeringMessageRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class CheeringMessageService {

	private final CheeringMessageRepository cheeringMessageRepository;
}
