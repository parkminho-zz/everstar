package com.everstarbackauth.domain.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackauth.domain.user.repository.SmsCertificationRepository;
import com.everstarbackauth.domain.user.requestDto.SmsRequestDto;
import com.everstarbackauth.global.util.SmsCertificationUtil;

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
	public void sendSms(SmsRequestDto.SmsCertificationRequest requestDto) {
		String to = validatePhoneNumber(requestDto.getPhone());
		String certificationNumber = generateCertificationNumber();

		smsUtil.sendSms(to, certificationNumber);
		smsCertificationRepository.createSmsCertification(to, certificationNumber);

		log.info("SMS sent successfully to {}", to);
	}

	@Transactional
	public void verifySms(SmsRequestDto.SmsCertificationRequest requestDto) {
		String phone = validatePhoneNumber(requestDto.getPhone());

		if (!isVerify(requestDto)) {
			throw new RuntimeException("인증번호가 일치하지 않습니다.");
		}

		smsCertificationRepository.deleteSmsCertification(phone);
		log.info("SMS verification successful for {}", phone);
	}

	public boolean isVerify(SmsRequestDto.SmsCertificationRequest requestDto) {
		String phone = validatePhoneNumber(requestDto.getPhone());
		String storedCertificationNumber = smsCertificationRepository.getSmsCertification(phone);

		boolean verificationResult = smsCertificationRepository.hasKey(phone) &&
			storedCertificationNumber.equals(requestDto.getCertificationNumber());

		if (!verificationResult) {
			log.warn("SMS verification failed for {}", phone);
		} else {
			log.info("SMS verification successful for {}", phone);
		}

		return verificationResult;
	}

	private String validatePhoneNumber(String phone) {
		if (phone == null || phone.isEmpty()) {
			throw new IllegalArgumentException("전화번호는 필수 입력값입니다.");
		}
		return phone;
	}

	private String generateCertificationNumber() {
		int randomNumber = (int)(Math.random() * 90000) + 10000;
		return String.valueOf(randomNumber);
	}
}
