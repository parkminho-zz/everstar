package com.everstarbackmain.domain.userLetter.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.petterLetter.model.PetLetter;
import com.everstarbackmain.domain.petterLetter.model.SendType;
import com.everstarbackmain.domain.petterLetter.repository.PetLetterRepository;
import com.everstarbackmain.domain.petterLetter.util.PetLetterScheduler;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.domain.userLetter.repository.UserLetterRepository;
import com.everstarbackmain.domain.userLetter.requestDto.WriteLetterRequestDto;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;
import com.everstarbackmain.global.util.S3UploadUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class UserLetterService {

	private final UserLetterRepository userLetterRepository;
	private final PetRepository petRepository;
	private final PetLetterRepository petLetterRepository;
	private final PetLetterScheduler petLetterScheduler;
	private final S3UploadUtil s3UploadUtil;

	@Transactional
	public void writeLetter(Authentication authentication, Long petId, WriteLetterRequestDto requestDto,
		MultipartFile image) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();

		Pet pet = petRepository.findByIdAndUserAndIsDeleted(petId, user, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		if (image != null) {
			String imageUrl = s3UploadUtil.saveFile(image);
			UserLetter userLetter = writeUserLetter(pet, requestDto, imageUrl);
			userLetterRepository.save(userLetter);
			petLetterScheduler.schedulePetLetter(userLetter);
			return;
		}

		UserLetter userLetter = writeUserLetterNoImage(pet, requestDto);
		userLetterRepository.save(userLetter);
		petLetterScheduler.schedulePetLetter(userLetter);
	}

	@Transactional
	public void writeLetterAnswer(Authentication authentication, Long petId, Long petLetterId,
		WriteLetterRequestDto requestDto, MultipartFile image) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();
		Pet pet = petRepository.findByIdAndUserAndIsDeleted(petId, user, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));
		PetLetter petLetter = petLetterRepository.findPetLetterByIdAndPetAndIsDeleted(petLetterId, pet, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PETLETTER_EXCEPTION));

		if (petLetter.getSendType().equals(SendType.USER)) {
			throw new ExceptionResponse(CustomException.ACCESS_LETTER_SEND_TYPE);
		}

		if (petLetter.getUserLetter() != null) {
			throw new ExceptionResponse(CustomException.NOT_ACCESS_SEND_LETTER_ANSWER);
		}

		if (image != null) {
			String imageUrl = s3UploadUtil.saveFile(image);
			UserLetter userLetter = writeUserLetter(pet, requestDto, imageUrl);
			userLetterRepository.save(userLetter);
			petLetter.fetchReplyLetter(userLetter);
			return;
		}

		UserLetter userLetter = writeUserLetterNoImage(pet, requestDto);
		userLetterRepository.save(userLetter);
		petLetter.fetchReplyLetter(userLetter);
	}

	private UserLetter writeUserLetter(Pet pet, WriteLetterRequestDto requestDto, String imgUrl) {
		UserLetter userLetter = UserLetter.writeLetterHasImage(pet, requestDto, imgUrl);
		return userLetter;
	}

	private UserLetter writeUserLetterNoImage(Pet pet, WriteLetterRequestDto requestDto) {
		UserLetter userLetter = UserLetter.writeLetterHasNotImage(pet, requestDto);
		return userLetter;
	}
}
