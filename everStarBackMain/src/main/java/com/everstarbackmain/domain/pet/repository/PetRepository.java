package com.everstarbackmain.domain.pet.repository;

import java.util.Optional;

import org.apache.kafka.common.protocol.types.Field;
import org.springframework.data.jpa.repository.JpaRepository;

import com.everstarbackmain.domain.pet.model.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {

	Optional<Pet> findByIdAndIsDeleted(Long id, boolean isDeleted);
}
