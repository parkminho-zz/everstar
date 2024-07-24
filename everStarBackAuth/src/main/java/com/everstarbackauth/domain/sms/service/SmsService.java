package com.everstarbackauth.domain.sms.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackauth.domain.sms.repository.SmsCertificationRepository;
import com.everstarbackauth.domain.sms.requestDto.CheckCodeRequestDto;
import com.everstarbackauth.domain.sms.requestDto.SendCodeRequestDto;
import com.everstarbackauth.global.util.SmsCertificationUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class SmsService {
	private final SmsCertificationUtil smsUtil;
	private final SmsCertificationRepository smsCertificationRepository;

	@Transactional
	public void sendSms(@Valid SendCodeRequestDto sendCodeRequestDto) {
		String to = validatePhoneNumber(sendCodeRequestDto.getPhone());
		String certificationNumber = generateCertificationNumber();

		smsUtil.sendSms(to, certificationNumber);
		smsCertificationRepository.createSmsCertification(to, certificationNumber);

		log.info("SMS sent successfully to {}", to);
	}

	@Transactional
	public void verifySms(CheckCodeRequestDto checkCodeRequestDto) {
		String phone = validatePhoneNumber(checkCodeRequestDto.getPhone());

		if (!isVerify(checkCodeRequestDto)) {
			throw new RuntimeException("인증번호가 일치하지 않습니다.");
		}

		smsCertificationRepository.deleteSmsCertification(phone);
		log.info("SMS verification successful for {}", phone);
	}

	public boolean isVerify(CheckCodeRequestDto checkCodeRequestDto) {
		String phone = validatePhoneNumber(checkCodeRequestDto.getPhone());
		String storedCertificationNumber = smsCertificationRepository.getSmsCertification(phone);

		boolean verificationResult = smsCertificationRepository.hasKey(phone) &&
			storedCertificationNumber.equals(checkCodeRequestDto.getCertificationNumber());

		if (!verificationResult) {
			log.warn("SMS verification failed for {}", phone);
		}
		if (verificationResult) {
			log.info("SMS verification successful for {}", phone);
		}

		return verificationResult;
	}

	private String validatePhoneNumber(String phone) {
		if (phone == null || phone.isEmpty()) {
			throw new IllegalArgumentException("전화번호는 필수 입력값입니다.");
		}
		String phonePattern = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$";
		if (!phone.matches(phonePattern)) {
			throw new IllegalArgumentException("전화번호 형식이 유효하지 않습니다.");
		}
		return phone;

	}

	private String generateCertificationNumber() {
		int randomNumber = (int)(Math.random() * 90000) + 10000;
		return String.valueOf(randomNumber);
	}
}
