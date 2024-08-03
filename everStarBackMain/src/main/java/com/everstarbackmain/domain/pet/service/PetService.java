package com.everstarbackmain.domain.pet.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.domain.memorialBook.repository.MemorialBookRepository;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetPersonality;
import com.everstarbackmain.domain.pet.repository.PetPersonalityRepository;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestDto.CreatePetRequestDto;
import com.everstarbackmain.domain.pet.requestDto.UpdatePetIntroductionDto;
import com.everstarbackmain.domain.pet.responseDto.EnrolledPetsResponseDto;
import com.everstarbackmain.domain.pet.responseDto.MyPagePetInfoResponseDto;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;
import com.everstarbackmain.domain.sentimentAnalysis.repository.SentimentAnalysisRepository;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class PetService {

	private final PetRepository petRepository;
	private final PetPersonalityRepository petPersonalityRepository;
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
			PetPersonality petPersonality = PetPersonality.createPersonality(pet, personalityValue);
			petPersonalityRepository.save(petPersonality);
		}
	}

	@Transactional
	public void updatePetIntroduction(Authentication authentication, Long petId, UpdatePetIntroductionDto requestDto) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();
		String newIntroduction = requestDto.getIntroduction();
		Pet pet = petRepository.findByIdAndIsDeleted(petId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		if (user != pet.getUser()) {
			throw new ExceptionResponse(CustomException.ACCESS_DENIED_EXCEPTION);
		}

		if (newIntroduction != null && !newIntroduction.isEmpty()) {
			pet.updatePetIntroduction(newIntroduction);
			return;
		}
		pet.updatePetIntroduction(pet.getName() + " 의 사랑스런 소개글을 작성 해주세요");
	}

	private void createMemorialBook(Pet pet) {
		MemorialBook memorialBook = MemorialBook.createMemorialBook(pet);
		memorialBookRepository.save(memorialBook);
	}

	private void createSentimentAnalysis(Pet pet) {
		SentimentAnalysis sentimentAnalysis = SentimentAnalysis.createSentimentAnalysis(pet);
		sentimentAnalysisRepository.save(sentimentAnalysis);
	}

	public List<EnrolledPetsResponseDto> getAllUserPets(Authentication authentication) {
		Long userId = ((PrincipalDetails)authentication.getPrincipal()).getUser().getId();
		List<Pet> pets = petRepository.findAllByUserIdAndIsDeleted(userId, false);
		return pets.stream()
			.map(EnrolledPetsResponseDto::createEnrolledResponseDto)
			.collect(Collectors.toList());
	}

	// public List<PetDetailResponseDto> getMyPetDetails() {
	//
	// }

}
