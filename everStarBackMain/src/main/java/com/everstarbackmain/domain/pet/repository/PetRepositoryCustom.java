package com.everstarbackmain.domain.pet.repository;

import java.util.List;

public interface PetRepositoryCustom {
	List<String> findPetPersonalitiesByIdAndIsDeleted(Long petId, Boolean isDeleted);
	Long findRandomActivePetIdExcluding(Long excludedPetId);
}
