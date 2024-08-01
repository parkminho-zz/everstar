package com.everstarbackmain.domain.letter.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.letter.service.LetterService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/pets/{pet-id}/letters")
@Slf4j(topic = "elk")
public class LetterController {

	private final LetterService letterService;

	@PostMapping
	public ResponseEntity<Map<String, Object>> writeLetter(@PathVariable int petId, @RequestBody) {
	}
}
