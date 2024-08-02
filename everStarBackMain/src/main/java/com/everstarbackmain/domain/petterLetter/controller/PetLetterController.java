package com.everstarbackmain.domain.petterLetter.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.petterLetter.service.PetLetterService;
import com.everstarbackmain.domain.userLetter.requestDto.WriteLetterRequestDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pets/{pet-id}/letters")
@Slf4j(topic = "elk")
public class PetLetterController {

	private final PetLetterService petLetterService;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getPetLetters(Authentication authentication, @PathVariable("pet-id") long petId) {

	}
}
