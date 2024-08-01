package com.everstarbackmain.domain.pet.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.everstarbackmain.domain.pet.model.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {

	@EntityGraph(attributePaths = "user")
	Optional<Pet> findByIdAndIsDeleted(Long id, boolean isDeleted);
	List<Pet> findAllByUserIdAndIsDeleted(Long id, boolean isDeleted);
}
