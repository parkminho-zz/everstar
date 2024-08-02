package com.everstarbackmain.domain.petterLetter.service;

import java.util.List;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.openai.util.OpenAiClient;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.petterLetter.model.PetLetter;
import com.everstarbackmain.domain.petterLetter.repository.PetLetterRepository;
import com.everstarbackmain.domain.petterLetter.responseDto.PetLetterResponseDto;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;
import com.everstarbackmain.global.sms.SmsCertificationUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class PetLetterService {

	private final PetLetterRepository petLetterRepository;
	private final PetRepository petRepository;
	private final OpenAiClient openAiClient;
	private final SmsCertificationUtil smsCertificationUtil;

	@Transactional
	@Async
	public void writePetLetterAnswer(UserLetter userLetter) {
		String content = openAiClient.writePetLetter(userLetter);
		PetLetter petLetter = PetLetter.writePetLetterAnswer(userLetter, content);

		petLetterRepository.save(petLetter);

		sendSms(userLetter);
	}

	public Page<PetLetterResponseDto> getPetLetters(@NotNull Authentication authentication, long petId, Pageable pageable) {
		User user = ((PrincipalDetails) authentication.getPrincipal()).getUser();
		if(!petRepository.existsByIdAndUserAndIsDeleted(petId,user,false)){
			throw new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION);
		}

		return petLetterRepository.findPetLettersByPetIdAndIsDelete(user,petId,pageable);
	}

	public void sendSms(UserLetter userLetter) {
		Pet pet = userLetter.getPet();
		User user = pet.getUser();
		smsCertificationUtil.sendSms(user.getPhoneNumber(), pet.getName());
	}
}
