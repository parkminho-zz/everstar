package com.everstarbackmain.domain.memorialBook.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.domain.memorialBook.repository.MemorialBookRepository;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class MemorialBookService {

	private final MemorialBookRepository memorialBookRepository;

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
}
