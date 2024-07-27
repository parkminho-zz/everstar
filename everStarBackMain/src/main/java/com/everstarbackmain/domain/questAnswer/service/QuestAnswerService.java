package com.everstarbackmain.domain.questAnswer.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

import org.springframework.scheduling.TaskScheduler;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.memorialBook.service.MemorialBookService;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.questAnswer.repository.QuestAnswerRepository;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class QuestAnswerService {

	private final TaskScheduler taskScheduler;
	private final QuestAnswerRepository questAnswerRepository;
	private final PetRepository petRepository;
	private final MemorialBookService memorialBookService;

	@Transactional
	public void createQuestAnswer(Authentication authentication, Long petId) {
		User user = ((PrincipalDetails) authentication.getPrincipal()).getUser();

		// TODO: 질문 답변 생성 메서드 구현

		plusPetQuestIndex(user, petId);
	}

	private void plusPetQuestIndex(User user, Long petId) {
		Optional<Pet> findPet = petRepository.findById(petId);
		Pet pet = findPet
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		pet.plusQuestIndex();

		if (pet.getQuestIndex() == 49) {
			scheduleMemorialBookActivation(user, pet);
		}
	}

	private void scheduleMemorialBookActivation(User user, Pet pet) {
		LocalTime questReceptionTime = user.getQuestReceptionTime();
		LocalDateTime nextDayQuestReceptionTime = LocalDateTime.of(LocalDate.now().plusDays(1), questReceptionTime);
		Date nextDayQuestReceptionDate = Date.from(nextDayQuestReceptionTime.atZone(ZoneId.systemDefault()).toInstant());

		taskScheduler.schedule(() -> memorialBookService.changeActiveStatus(pet.getId()), nextDayQuestReceptionDate);
	}

}
