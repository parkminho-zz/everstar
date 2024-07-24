package com.everstarbackmain.domain.user.service;

import java.time.LocalDate;
import java.time.LocalTime;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.repository.UserRepository;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;

@ExtendWith(MockitoExtension.class)
public class JoinServiceTest {

	@InjectMocks
	private JoinService joinService;

	@Mock
	private UserRepository userRepository;

	@Mock
	private PasswordEncoder passwordEncoder;

	private JoinRequestDto requestDto;
	@BeforeEach
	public void setup(){
		requestDto =  new JoinRequestDto("example@email.com","password123","exampleUser","010-1234-5678", LocalDate.of(1990, 1, 1), Gender.MALE, LocalTime.parse("10:00:00"), Role.ROLE_USER);
	}

	@Test
	@DisplayName("회원가입 성공 테스트")
	public void 회원가입_성공_테스트() {
		Assertions.assertThatNoException().isThrownBy(() -> joinService.signup(requestDto));
	}
}