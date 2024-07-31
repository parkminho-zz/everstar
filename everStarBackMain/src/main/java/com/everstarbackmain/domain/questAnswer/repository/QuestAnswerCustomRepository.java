package com.everstarbackmain.domain.questAnswer.repository;

import java.util.List;

import org.springframework.data.repository.query.Param;

public interface QuestAnswerCustomRepository {

	List<String> findContentByPetIdAndSpecificQuestIds(Long petId, Integer firstQuestId, Integer secondQuestId);
}
