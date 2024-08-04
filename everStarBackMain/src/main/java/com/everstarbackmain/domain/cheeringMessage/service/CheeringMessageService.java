package com.everstarbackmain.domain.cheeringMessage.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.cheeringMessage.model.CheeringMessage;
import com.everstarbackmain.domain.cheeringMessage.repository.CheeringMessageRepository;
import com.everstarbackmain.domain.cheeringMessage.requestDto.CreateCheeringMessageRequestDto;
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
public class CheeringMessageService {

	private final CheeringMessageRepository cheeringMessageRepository;
	private final PetRepository petRepository;

	@Transactional
	public void createCheeringMessage(Authentication authentication, Long petId,
		CreateCheeringMessageRequestDto requestDto) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();
		Pet pet = petRepository.findByIdAndUserAndIsDeleted(petId, user, false).orElseThrow(() -> new ExceptionResponse(
			CustomException.NOT_FOUND_PET_EXCEPTION));

		CheeringMessage cheeringMessage = CheeringMessage.createCheeringMessage(requestDto, pet);
		cheeringMessageRepository.save(cheeringMessage);
	}
}
