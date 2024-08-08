package com.everstarbackmain.domain.pet.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.everstarbackmain.domain.pet.model.PetPersonality;

public interface PetPersonalityRepository extends JpaRepository<PetPersonality, Long>, PetPersonalityRepositoryCustom{

	List<String> findPersonalityValuesByPetIdAndIsDeleted(Long petId, Boolean isDeleted);
}
