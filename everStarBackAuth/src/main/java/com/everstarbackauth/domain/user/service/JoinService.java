package com.everstarbackauth.domain.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eternitystar.domain.user.model.User;
import com.eternitystar.domain.user.repository.UserRepository;
import com.eternitystar.domain.user.requestDto.JoinRequestDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class JoinService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@Transactional
	public void signup(JoinRequestDto requestDto) {
		requestDto.passwordEncode(passwordEncoder.encode(requestDto.getPassword()));
		User user = User.signUpUser(requestDto);
		userRepository.save(user);
	}
}
