package com.everstarbackmain.domain.pet.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;

import com.everstarbackmain.domain.memorialBook.repository.MemorialBookRepository;
import com.everstarbackmain.domain.pet.repository.PersonalityRepository;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestDto.CreatePetRequestDto;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

@ExtendWith(MockitoExtension.class)
public class CreatePetServiceTest {

	@Mock
	private PetRepository petRepository;

	@Mock
	private PersonalityRepository personalityRepository;

	@Mock
	private MemorialBookRepository memorialBookRepository;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	@InjectMocks
	private PetService petService;

	private CreatePetRequestDto requestDto;
	private User user;

	@BeforeEach
	public void setup() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111", LocalDate.now(),
			Gender.MALE, LocalTime.now(), Role.ROLE_USER));
		requestDto =  new CreatePetRequestDto("petName",10,
			LocalDate.of(1990, 1, 1),"species", Gender.MALE,
			"relationship", "profileImageUrl", "introduction", List.of("개구쟁이", "귀염둥이"));
	}

	@Test
	@DisplayName("펫 생성 성공 테스트")
	public void 펫_생성_성공_테스트() {
		//given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);

		//when
		Assertions.assertThatNoException().isThrownBy(() -> petService.createPet(authentication, requestDto));
	}

}