package com.everstarbackmain.domain.questAnswer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;

public interface QuestAnswerRepository extends JpaRepository<QuestAnswer, Long> {

	List<QuestAnswer> findByPetId(Long petId);

	@Query("SELECT qa.content FROM QuestAnswer qa WHERE qa.pet.id = :petId AND qa.quest.id IN (:startQuestId, :endQuestId)")
	List<String> findContentByPetIdAndSpecificQuestIds(@Param("petId") Long petId,
		@Param("startQuestId") Integer startQuestId, @Param("endQuestId") Integer endQuestId);
}
