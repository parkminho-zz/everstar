package com.everstarbackmain.domain.questAnswer.repository;

import java.util.List;

import org.springframework.data.repository.query.Param;

public interface QuestAnswerCustomRepository {

	List<String> findContentByPetIdAndSpecificQuestIdsAndIsDeleted(Long petId, Integer firstQuestId, Integer secondQuestId, boolean isDeleted);
}
