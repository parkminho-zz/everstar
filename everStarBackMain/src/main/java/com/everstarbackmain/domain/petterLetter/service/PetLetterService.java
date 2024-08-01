package com.everstarbackmain.domain.petterLetter.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.petterLetter.repository.PetLetterRepository;
import com.everstarbackmain.domain.userLetter.model.UserLetter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class PetLetterService {

	private final PetLetterRepository petLetterRepository;

	public void writePetLetter(UserLetter userLetter){


	}
}
