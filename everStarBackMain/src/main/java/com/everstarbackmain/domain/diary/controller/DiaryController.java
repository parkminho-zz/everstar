package com.everstarbackmain.domain.diary.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.diary.message.SuccessDiaryMessage;
import com.everstarbackmain.domain.diary.requestDto.CreateDiaryRequestDto;
import com.everstarbackmain.domain.diary.service.DiaryService;
import com.everstarbackmain.global.util.HttpResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pets/{pet-id}/memorialbooks/{memorialbook-id}/diaries")
@Slf4j(topic = "elk")
public class DiaryController {

	private final DiaryService diaryService;
	private final HttpResponseUtil responseUtil;

	@PostMapping
	public ResponseEntity<Map<String, Object>> createDiary(@PathVariable("memorialbook-id") Long memorialBookId,
		Authentication authentication, @RequestBody @Valid CreateDiaryRequestDto requestDto) {
		diaryService.createDiary(authentication, memorialBookId, requestDto);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(
			SuccessDiaryMessage.SUCCESS_CREATE_DIARY);
		log.info("main server - request : {}", requestDto);
		log.info("main server - response : {}", response);
		return response;
	}
}
