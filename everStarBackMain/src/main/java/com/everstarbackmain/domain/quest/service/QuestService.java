package com.everstarbackmain.domain.quest.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.domain.quest.repository.QuestRepository;
import com.everstarbackmain.domain.quest.responseDto.QuestDetailResponseDto;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class QuestService {

	private final QuestRepository questRepository;
	private final PetRepository petRepository;


	public QuestDetailResponseDto getQuestDetail(Long petId, Long questId) {

		Quest quest = questRepository.findById(questId)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_QUEST_EXCEPTION));

		return QuestDetailResponseDto.createQuestDetailResponseDto(quest);
	}

	@Transactional
	public void receiveQuest(User user, Long petId) {
		Pet pet = petRepository.findByIdAndIsDeleted(petId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		int questIndex = pet.getQuestIndex();
		if (questIndex > 49) {
			throw new ExceptionResponse(CustomException.ALL_QUESTS_COMPLETED_EXCEPTION);
		}

		Quest quest = questRepository.findById((long)questIndex)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_QUEST_EXCEPTION));

		// 퀘스트를 수신하고 처리하는 로직을 추가. 예: 새로운 퀘스트를 발행, SSE를 통해 알림
		//SSE 여기 들어가야함
		// 이후의 스케줄링 작업 (퀘스트 잘 처리되나 확인 필요 함)
	}

}
