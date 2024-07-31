package com.everstarbackmain.domain.diary.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.diary.model.Diary;
import com.everstarbackmain.domain.diary.repository.DiaryRepository;
import com.everstarbackmain.domain.diary.requestDto.CreateDiaryRequestDto;
import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.domain.memorialBook.repository.MemorialBookRepository;
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
public class DiaryService {

	private final DiaryRepository diaryRepository;
	private final MemorialBookRepository memorialBookRepository;

	@Transactional
	public void createDiary(Authentication authentication, Long memorialBookId,
		CreateDiaryRequestDto createDiaryRequestDto) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();

		MemorialBook memorialBook = memorialBookRepository.findById(memorialBookId)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION));
		validateUserMemorialBook(user, memorialBook);
		validateMemorialBookActivated(memorialBook);

		Diary diary = Diary.createDiary(memorialBook, createDiaryRequestDto);
		diaryRepository.save(diary);
	}

	private void validateUserMemorialBook(User user, MemorialBook memorialBook) {
		if (user.getId() != memorialBook.getPet().getUser().getId()) {
			throw new ExceptionResponse(CustomException.NOT_MY_MEMORIAL_BOOK_EXCEPTION);
		}
	}

	private void validateMemorialBookActivated(MemorialBook memorialBook) {
		if (!memorialBook.getIsActive()) {
			throw new ExceptionResponse(CustomException.NOT_ACTIVATED_MEMORIAL_BOOK_EXCEPTION);
		}
	}
}
