package com.everstarbackauth.domain.user.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.everstarbackauth.domain.user.repository.SmsCertificationRepository;
import com.everstarbackauth.domain.user.requestDto.SmsRequestDto;

class SmsServiceTest {
	@Mock
	private SmsCertificationRepository smsCertificationRepository;

	@InjectMocks
	private SmsService smsService;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	@DisplayName("문자인증 성공 테스트")
	void sendSms() {
		// Given
		SmsRequestDto requestDto = new SmsRequestDto();
		requestDto.setPhone("01020007052");
		requestDto.setCertificationNumber("12345");

		when(smsCertificationRepository.hasKey("01020007052")).thenReturn(true);
		when(smsCertificationRepository.getSmsCertification("01020007052")).thenReturn("12345");

		// When
		smsService.verifySms(requestDto);

		// Then
		verify(smsCertificationRepository).deleteSmsCertification("01020007052");

	}

	@Test
	@DisplayName("문자인증 실패 테스트")
	void verifySms() {
		// Given
		SmsRequestDto requestDto = new SmsRequestDto();
		requestDto.setPhone("01020007052");
		requestDto.setCertificationNumber("54321");

		when(smsCertificationRepository.hasKey("01020007052")).thenReturn(true);
		when(smsCertificationRepository.getSmsCertification("01020007052")).thenReturn("12345");

		// When,  Then
		assertThatThrownBy(() -> smsService.verifySms(requestDto))
			.isInstanceOf(RuntimeException.class)
			.hasMessage("인증번호가 일치하지 않습니다.");

		verify(smsCertificationRepository, never()).deleteSmsCertification(anyString());

	}

	@Test
	@DisplayName("유효하지 않은 전화번호 테스트")
	void isVerify() {
		// Given
		SmsRequestDto requestDto = new SmsRequestDto();
		requestDto.setPhone(null);

		// When, Then
		assertThatThrownBy(() -> smsService.verifySms(requestDto))
			.isInstanceOf(IllegalArgumentException.class)
			.hasMessageContaining("전화번호는 필수 입력값입니다.");

		verify(smsCertificationRepository, never()).deleteSmsCertification(anyString());
	}
}