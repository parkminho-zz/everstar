package com.everstarbackauth.domain.sms.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.everstarbackauth.domain.sms.repository.SmsCertificationRepository;
import com.everstarbackauth.domain.sms.requestDto.CheckCodeRequestDto;
import com.everstarbackauth.domain.sms.requestDto.SendCodeRequestDto;
import com.everstarbackauth.global.util.SmsCertificationUtil;

class SmsServiceTest {
	@Mock
	private SmsCertificationRepository smsCertificationRepository;

	@Mock
	private SmsCertificationUtil smsUtil;

	@InjectMocks
	private SmsService smsService;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	@DisplayName("문자전송 성공 테스트")
	void sendSms() {
		// Given
		SendCodeRequestDto sendCodeRequestDto = new SendCodeRequestDto();
		sendCodeRequestDto.setPhone("01020007052");

		// When
		smsService.sendSms(sendCodeRequestDto);

		// Then
		verify(smsUtil).sendSms(anyString(), anyString());
		verify(smsCertificationRepository).createSmsCertification(anyString(), anyString());
	}

	@Test
	@DisplayName("문자전송: 유효하지 않은 전화번호 형식 테스트")
	void sendSms_invalidPhoneFormat() {
		// Given
		SendCodeRequestDto sendCodeRequestDto = new SendCodeRequestDto();
		sendCodeRequestDto.setPhone("0123456");

		// When, Then
		assertThatThrownBy(() -> smsService.sendSms(sendCodeRequestDto))
			.isInstanceOf(IllegalArgumentException.class)
			.hasMessageContaining("전화번호 형식이 유효하지 않습니다.");
	}

	@Test
	@DisplayName("문자인증 성공 테스트")
	void verifySms() {
		// Given
		CheckCodeRequestDto checkCodeRequestDto = new CheckCodeRequestDto();
		checkCodeRequestDto.setPhone("01020007052");
		checkCodeRequestDto.setCertificationNumber("12345");

		when(smsCertificationRepository.hasKey("01020007052")).thenReturn(true);
		when(smsCertificationRepository.getSmsCertification("01020007052")).thenReturn("12345");

		// When
		smsService.verifySms(checkCodeRequestDto);

		// Then
		verify(smsCertificationRepository).deleteSmsCertification("01020007052");
	}

	@Test
	@DisplayName("문자인증 실패 테스트")
	void verifySms_fail() {
		// Given
		CheckCodeRequestDto checkCodeRequestDto = new CheckCodeRequestDto();
		checkCodeRequestDto.setPhone("01020007052");
		checkCodeRequestDto.setCertificationNumber("54321");

		when(smsCertificationRepository.hasKey("01020007052")).thenReturn(true);
		when(smsCertificationRepository.getSmsCertification("01020007052")).thenReturn("12345");

		// When, Then
		assertThatThrownBy(() -> smsService.verifySms(checkCodeRequestDto))
			.isInstanceOf(RuntimeException.class)
			.hasMessage("인증번호가 일치하지 않습니다.");

		verify(smsCertificationRepository, never()).deleteSmsCertification(anyString());
	}

	@Test
	@DisplayName("문자인증: 유효하지 않은 전화번호 형식 테스트")
	void verifySms_invalidPhoneFormat() {
		// Given
		CheckCodeRequestDto checkCodeRequestDto = new CheckCodeRequestDto();
		checkCodeRequestDto.setPhone("0123456");
		checkCodeRequestDto.setCertificationNumber("12345");

		// When, Then
		assertThatThrownBy(() -> smsService.verifySms(checkCodeRequestDto))
			.isInstanceOf(IllegalArgumentException.class)
			.hasMessageContaining("전화번호 형식이 유효하지 않습니다.");

		verify(smsCertificationRepository, never()).deleteSmsCertification(anyString());
	}

	@Test
	@DisplayName("문자인증: 유효하지 않은 전화번호 null 테스트")
	void verifySms_nullPhone() {
		// Given
		CheckCodeRequestDto checkCodeRequestDto = new CheckCodeRequestDto();
		checkCodeRequestDto.setPhone(null);

		// When, Then
		assertThatThrownBy(() -> smsService.verifySms(checkCodeRequestDto))
			.isInstanceOf(IllegalArgumentException.class)
			.hasMessageContaining("전화번호는 필수 입력값입니다.");

		verify(smsCertificationRepository, never()).deleteSmsCertification(anyString());
	}
}
