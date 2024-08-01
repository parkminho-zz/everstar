package com.everstarbackmain.domain.userLetter.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.userLetter.requestDto.WriteLetterRequestDto;
import com.everstarbackmain.domain.userLetter.service.UserLetterService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/pets/{pet-id}/letters")
@Slf4j(topic = "elk")
public class UserLetterController {

	private final UserLetterService userLetterService;

	@PostMapping
	public ResponseEntity<Map<String, Object>> writeLetter(Authentication authentication, @PathVariable("pet-id") long petId, @RequestBody @Valid WriteLetterRequestDto requestDto) {
		userLetterService.writeLetter(authentication, petId, requestDto);
		ResponseEntity<Map>

	}
}
