package com.everstarbackmain.domain.userLetter.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.petterLetter.util.PetLetterScheduler;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.domain.userLetter.repository.UserLetterRepository;
import com.everstarbackmain.domain.userLetter.requestDto.WriteLetterRequestDto;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.repository.PetRepository;
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
public class UserLetterService {

	private final UserLetterRepository userLetterRepository;
	private final PetRepository petRepository;
	private final PetLetterScheduler petLetterScheduler;

	@Transactional
	public void writeLetter(Authentication authentication, long petId, WriteLetterRequestDto requestDto) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();

		Pet pet = petRepository.findByIdAndIsDeleted(petId,false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		if(requestDto.getImageUrl() == null){
			UserLetter userLetter = UserLetter.writeLetterHasNotImage(pet,requestDto);
			userLetterRepository.save(userLetter);
			petLetterScheduler.schedulePetLetter(userLetter);
			return;
		}
		UserLetter userLetter = UserLetter.writeLetterHasImage(pet,requestDto);
		userLetterRepository.save(userLetter);
		petLetterScheduler.schedulePetLetter(userLetter);
	}
}
