package com.everstarbackmain.domain.questAnswer.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.security.core.Authentication;

import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.domain.memorialBook.util.MemorialBookScheduler;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestDto.CreatePetRequestDto;
import com.everstarbackmain.domain.questAnswer.repository.QuestAnswerRepository;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

@ExtendWith(MockitoExtension.class)
class QuestAnswerServiceTest {

	@InjectMocks
	private QuestAnswerService questAnswerService;

	@Mock
	private PetRepository petRepository;

	@Mock
	private MemorialBookScheduler memorialBookScheduler;

	@Mock
	private QuestAnswerRepository questAnswerRepository;

	@Mock
	private TaskScheduler taskScheduler;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	private User user;
	private Pet pet;
	private MemorialBook memorialBook;

	@BeforeEach
	public void setup() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));
		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", Gender.MALE,
			"relationship", "profileImageUrl", "introduction", List.of("개구쟁이", "귀염둥이")));
		memorialBook = MemorialBook.createMemorialBook(pet);
	}

	@Test
	@DisplayName("퀘스트_49일차_답변_생성_후_스케줄링_메서드_호출_테스트")
	public void 퀘스트_49일차_답변_생성_후_스케줄링_메서드_호출_테스트() {
		// given
		for (int i = 0; i < 48; i++) {
			pet.plusQuestIndex();
		}
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findById(anyLong())).willReturn(Optional.of(pet));

		// when
		questAnswerService.createQuestAnswer(authentication, 1L);

		// then
		verify(memorialBookScheduler).scheduleMemorialBookActivation(user, 1L);
	}
}