package com.everstarbackmain.domain.letter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.everstarbackmain.domain.letter.model.Letter;

@Repository
public interface LetterRepository extends JpaRepository<Letter, Long> {
}
