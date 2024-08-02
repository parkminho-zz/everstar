package com.everstarbackmain.domain.petterLetter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.everstarbackmain.domain.petterLetter.model.PetLetter;

@Repository
public interface PetLetterRepository extends JpaRepository<PetLetter, Long> {
}
