package com.everstarbackmain.domain.cheeringMessage.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.cheeringMessage.service.CheeringMessageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pets/{pet-id}/cheeringMessages")
@Slf4j(topic = "elk")
public class CheeringMessageController {

	private final CheeringMessageService cheeringMessageService;

	@PostMapping
	public void createCheeringMessage(@PathVariable("pet-id") Long petId, )

}
