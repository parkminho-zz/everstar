package com.everstarbackmain.domain.userLetter.service;

import static org.mockito.ArgumentMatchers.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

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

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestDto.CreatePetRequestDto;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.domain.userLetter.repository.UserLetterRepository;
import com.everstarbackmain.domain.userLetter.requestDto.WriteLetterRequestDto;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

@ExtendWith(MockitoExtension.class)
public class WriteLetterServiceTest {

	@InjectMocks
	private UserLetterService userLetterService;

	@Mock
	private UserLetterRepository userLetterRepository;

	@Mock
	private PetRepository petRepository;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	private WriteLetterRequestDto requestDto;
	private WriteLetterRequestDto noImageRequestDto;
	private User user;
	private Pet pet;
	private UserLetter userLetter;

	@BeforeEach
	public void setUp() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));

		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", Gender.MALE,
			"relationship", "profileImageUrl", List.of("개구쟁이", "귀염둥이")));

		requestDto = new WriteLetterRequestDto("dd", "dd");
		noImageRequestDto = new WriteLetterRequestDto("dd");
		userLetter = UserLetter.writeLetterHasImage(pet, requestDto);
	}

	@Test
	@DisplayName("유저 편지 쓰기 성공 테스트")
	public void 유저_편지_쓰기_성공_테스트() {
		long id = 1;
		//given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		BDDMockito.given(petRepository.findByIdAndIsDeleted(id, false)).willReturn(Optional.of(pet));

		//then
		Assertions.assertThatNoException()
			.isThrownBy(() -> userLetterService.writeLetter(authentication, id, requestDto));
	}

	@Test
	@DisplayName("유저 편지 쓰기 성공 테스트 이미지 없음")
	public void 유저_편지_쓰기_성공_테스트_이미지_없음() {
		long id = 1;
		//given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		BDDMockito.given(petRepository.findByIdAndIsDeleted(id, false)).willReturn(Optional.of(pet));

		//then
		Assertions.assertThatNoException()
			.isThrownBy(() -> userLetterService.writeLetter(authentication, id, noImageRequestDto));
	}
}
