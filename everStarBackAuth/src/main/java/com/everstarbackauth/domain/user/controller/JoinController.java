package com.everstarbackauth.domain.user.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackauth.domain.user.requestDto.SmsRequestDto;
import com.everstarbackauth.domain.user.responseDto.SmsResponseMessage;
import com.everstarbackauth.domain.user.service.SmsService;
import com.everstarbackauth.global.util.HttpResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/users")
public class JoinController {

	private final HttpResponseUtil responseUtil;
	private final SmsService smsService;

	@PostMapping("/users/send-code")
	public ResponseEntity<?> sendCode(@RequestBody @Valid SmsRequestDto.SmsCertificationRequest requestDto) {

		smsService.sendSms(requestDto);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(SmsResponseMessage.SUCCESS_SEND);

		return response;
	}

	@PostMapping("/users/check-code")
	public ResponseEntity<?> SmsVerification(@RequestBody @Valid SmsRequestDto.SmsCertificationRequest requestDto) {

		smsService.verifySms(requestDto);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(SmsResponseMessage.SUCCESS_VERIFY);

		return response;
	}

}
