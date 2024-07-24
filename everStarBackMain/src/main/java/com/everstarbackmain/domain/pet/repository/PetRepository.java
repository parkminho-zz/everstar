package com.everstarbackmain.domain.pet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.everstarbackmain.domain.pet.model.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {
}
