package com.everstarbackmain.domain.memorialBook.service;

import java.util.Optional;

import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.memorialBook.message.PsychologicalTestResultMessage;
import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.domain.memorialBook.repository.MemorialBookRepository;
import com.everstarbackmain.domain.memorialBook.requestDto.MemorialBookTestResultRequestDto;
import com.everstarbackmain.domain.memorialBook.util.PsychologicalTestResultMapper;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class MemorialBookService {

	private final MemorialBookRepository memorialBookRepository;
	private final PetRepository petRepository;

	@Transactional
	public void changeOpenStatus(Long memorialBookId) {
		Optional<MemorialBook> findMemorialBook = memorialBookRepository.findById(memorialBookId);
		MemorialBook memorialBook = findMemorialBook
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION));
		validateActiveStatus(memorialBook);
		memorialBook.changeOpenStatus();
	}

	private void validateActiveStatus(MemorialBook memorialBook) {
		if (!memorialBook.getIsActive()) {
			throw new ExceptionResponse(CustomException.NOT_ACTIVATED_MEMORIAL_BOOK_EXCEPTION);
		}
	}

	@Transactional
	@Async
	public void changeActiveStatus(Long petId) {
		Optional<MemorialBook> findMemorialBook = memorialBookRepository.findByPetId(petId);
		MemorialBook memorialBook = findMemorialBook
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION));

		memorialBook.changeActiveStatus();
	}

	@Transactional
	public void addPsychologicalTestResult(Authentication authentication, Long petId, Long memorialBookId,
		MemorialBookTestResultRequestDto testResultRequestDto) {
		Optional<MemorialBook> findMemorialBook = memorialBookRepository.findById(memorialBookId);
		MemorialBook memorialBook = findMemorialBook
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION));

		validateMemorialBook(authentication, petId, memorialBook);
		addTestResultString(memorialBook, testResultRequestDto.getPsychologicalTestResult());
	}

	private void validateMemorialBook(Authentication authentication, Long petId, MemorialBook memorialBook) {
		User user = ((PrincipalDetails) authentication.getPrincipal()).getUser();

		Optional<Pet> findPet = petRepository.findById(petId);
		Pet pet = findPet
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		if ((pet.getUser().getId() != user.getId()) || (petId != memorialBook.getPet().getId())) {
			throw new ExceptionResponse(CustomException.NOT_MY_MEMORIAL_BOOK_EXCEPTION);
		}
	}

	private void addTestResultString(MemorialBook memorialBook, Integer resultScore) {
		if (resultScore < 0 || resultScore > 27) {
			throw new ExceptionResponse(CustomException.WRONG_TYPE_EXCEPTION);
		}

		String resultMessage = PsychologicalTestResultMapper.getTestResultMessage(resultScore);
		memorialBook.addPsychologicalTestResult(resultMessage);
	}
}
