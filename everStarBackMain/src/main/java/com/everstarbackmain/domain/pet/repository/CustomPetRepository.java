package com.everstarbackmain.domain.pet.repository;

import java.util.Optional;

import com.everstarbackmain.domain.pet.model.Pet;

public interface CustomPetRepository {
	Optional<Pet> findPetWithPetPersonalities(Long petId, boolean isDeleted);
}
