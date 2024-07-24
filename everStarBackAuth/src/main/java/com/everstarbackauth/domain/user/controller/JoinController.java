package com.everstarbackauth.domain.user.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eternitystar.domain.user.requestDto.JoinRequestDto;
import com.eternitystar.domain.user.responseDto.JoinResponseMessage;
import com.eternitystar.domain.user.service.JoinService;
import com.eternitystar.global.util.HttpResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class JoinController {

	private final JoinService joinService;
	private final HttpResponseUtil responseUtil;

	@PostMapping("/join")
	public ResponseEntity<?> signup(@RequestBody @Valid JoinRequestDto requestDto) {

		joinService.signup(requestDto);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(JoinResponseMessage.SUCCESS_SIGNUP);
		
		return response;
	}
}
