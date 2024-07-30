package com.everstarbackmain.domain.pet.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.domain.memorialBook.repository.MemorialBookRepository;
import com.everstarbackmain.domain.pet.model.Personality;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.repository.PersonalityRepository;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestDto.CreatePetRequestDto;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;
import com.everstarbackmain.domain.sentimentAnalysis.repository.SentimentAnalysisRepository;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class PetService {

	private final PetRepository petRepository;
	private final PersonalityRepository personalityRepository;
	private final MemorialBookRepository memorialBookRepository;
	private final SentimentAnalysisRepository sentimentAnalysisRepository;

	@Transactional
	public void createPet(Authentication authentication, CreatePetRequestDto createPetRequestDto) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();

		Pet pet = Pet.createPet(user, createPetRequestDto);
		petRepository.save(pet);

		addPersonalities(pet, createPetRequestDto);
		createMemorialBook(pet);
		createSentimentAnalysis(pet);
	}

	private void addPersonalities(Pet pet, CreatePetRequestDto createPetRequestDto) {
		for (String personalityValue : createPetRequestDto.getPersonalities()) {
			Personality personality = Personality.createPersonality(pet, personalityValue);
			personalityRepository.save(personality);
		}
	}

	private void updatePetIntroduction(Pet pet) {

	}


	private void createMemorialBook(Pet pet) {
		MemorialBook memorialBook = MemorialBook.createMemorialBook(pet);
		memorialBookRepository.save(memorialBook);
	}

	private void createSentimentAnalysis(Pet pet) {
		SentimentAnalysis sentimentAnalysis = SentimentAnalysis.createSentimentAnalysis(pet);
		sentimentAnalysisRepository.save(sentimentAnalysis);
	}

}
