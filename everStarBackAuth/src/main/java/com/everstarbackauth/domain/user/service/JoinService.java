package com.everstarbackauth.domain.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackauth.domain.sms.repository.SmsCertificationRepository;
import com.everstarbackauth.domain.user.model.User;
import com.everstarbackauth.domain.user.repository.UserRepository;
import com.everstarbackauth.domain.user.requestDto.AuthenticateUserRequestDto;
import com.everstarbackauth.domain.user.requestDto.JoinRequestDto;
import com.everstarbackauth.global.exception.CustomException;
import com.everstarbackauth.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class JoinService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final SmsCertificationRepository smsCertificationRepository;

	@Transactional
	public void signup(JoinRequestDto requestDto) {
		requestDto.passwordEncode(passwordEncoder.encode(requestDto.getPassword()));
		User user = User.signUpUser(requestDto);
		userRepository.save(user);
	}

	@Transactional
	public void authenticateUser(AuthenticateUserRequestDto requestDto) {
		User user = userRepository.findUserByEmailAndIsDeleted(requestDto.getEmail(), false).orElseThrow(() -> new ExceptionResponse(
			CustomException.NOT_FOUND_USER_EXCEPTION));
		if(!smsCertificationRepository.existsBySuccessNumber(requestDto.getPhoneNumber())){
			throw new ExceptionResponse(CustomException.NOT_AUTH_PHONE_NUMBER);
		}

		user.authenticateUser(requestDto);
	}
}
