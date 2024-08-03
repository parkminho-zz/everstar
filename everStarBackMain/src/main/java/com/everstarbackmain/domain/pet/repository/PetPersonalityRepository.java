package com.everstarbackmain.domain.pet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.everstarbackmain.domain.pet.model.PetPersonality;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;

public interface PetPersonalityRepository extends JpaRepository<PetPersonality, Long> {
	List<PetPersonality> findPetPersonalitiesByAnd(Long petId, Boolean isDeleted);

}
