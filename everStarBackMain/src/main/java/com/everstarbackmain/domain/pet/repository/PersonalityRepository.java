package com.everstarbackmain.domain.pet.repository;

import javax.swing.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.everstarbackmain.domain.pet.model.Personality;

public interface PersonalityRepository extends JpaRepository<Personality, Long> {
}
