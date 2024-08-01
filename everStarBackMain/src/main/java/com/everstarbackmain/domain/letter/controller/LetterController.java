package com.everstarbackmain.domain.letter.controller;

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
}
