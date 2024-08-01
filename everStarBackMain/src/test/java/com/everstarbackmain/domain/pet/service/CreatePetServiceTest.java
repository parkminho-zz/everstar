package com.everstarbackmain.domain.pet.service;

import static org.assertj.core.api.BDDAssertions.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
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
import org.springframework.test.util.ReflectionTestUtils;

import com.everstarbackmain.domain.memorialBook.repository.MemorialBookRepository;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;

import com.everstarbackmain.domain.pet.repository.PersonalityRepository;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestDto.CreatePetRequestDto;
import com.everstarbackmain.domain.pet.responseDto.EnrolledPetsResponseDto;
import com.everstarbackmain.domain.sentimentAnalysis.repository.SentimentAnalysisRepository;
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
	private SentimentAnalysisRepository sentimentAnalysisRepository;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	@InjectMocks
	private PetService petService;

	private CreatePetRequestDto requestDto;
	private User user;
	private Pet pet;
	private List<Pet> petList;

	@BeforeEach
	public void setup() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111", LocalDate.now(),
			Gender.MALE, LocalTime.now(), Role.ROLE_USER));
		requestDto = new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", "profileImageUrl", List.of("개구쟁이", "귀염둥이"));

		pet = Pet.builder()
			.user(user)
			.name("쫑아지")
			.age(10)
			.memorialDate(LocalDate.of(2024, 8, 1))
			.species("CAT")
			.gender(PetGender.MALE)
			.relationship("relationship")
			.profileImageUrl("profileImageUrl")
			.build();

		ReflectionTestUtils.setField(pet, "id", 1L);

		petList = List.of(pet);
	}

	@Test
	@DisplayName("펫 생성 성공 테스트")
	public void 펫_생성_성공_테스트() {
		// given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);

		// when
		Throwable thrown = catchThrowable(() -> petService.createPet(authentication, requestDto));

		// then
		Assertions.assertThat(thrown).isNull(); // 예외가 발생하지 않았는지 확인
	}

	@Test
	@DisplayName("유저의 반려동물 목록 조회 성공 테스트 - 존재하는 경우")
	public void 유저의_반려동물_목록_조회_성공_테스트_존재하는경우() {
		// given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		BDDMockito.given(petRepository.findAllByUserIdAndIsDeleted(user.getId(), false)).willReturn(petList);

		// when
		List<EnrolledPetsResponseDto> responseDtos = petService.getAllUserPets(authentication);

		// then
		Assertions.assertThat(responseDtos).isNotEmpty();
		Assertions.assertThat(responseDtos.size()).isEqualTo(1);

		EnrolledPetsResponseDto responseDto = responseDtos.get(0);
		Assertions.assertThat(responseDto.getProfileImageUrl()).isEqualTo(pet.getProfileImageUrl());
		Assertions.assertThat(responseDto.getName()).isEqualTo(pet.getName());
	}

	@Test
	@DisplayName("유저의 반려동물 목록 조회 성공 테스트 - 존재하지 않는 경우")
	public void 유저의_반려동물_목록_조회_성공_테스트_존재하지않는경우() {
		// given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		BDDMockito.given(petRepository.findAllByUserIdAndIsDeleted(user.getId(), false))
			.willReturn(Collections.emptyList());

		// when
		List<EnrolledPetsResponseDto> responseDtos = petService.getAllUserPets(authentication);

		// then
		Assertions.assertThat(responseDtos).isEmpty();
	}
}