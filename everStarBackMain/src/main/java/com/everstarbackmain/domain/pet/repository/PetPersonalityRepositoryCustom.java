package com.everstarbackmain.domain.pet.repository;

import java.util.List;

import org.springframework.data.domain.Page;

public interface PetPersonalityRepositoryCustom {

	List<String> findPersonalityValuesByPetIdAndIsDeleted(Long petId, Boolean isDeleted);
	Page<>
}
