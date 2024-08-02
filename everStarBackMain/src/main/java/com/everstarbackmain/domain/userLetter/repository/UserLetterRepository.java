package com.everstarbackmain.domain.userLetter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.everstarbackmain.domain.userLetter.model.UserLetter;

@Repository
public interface UserLetterRepository extends JpaRepository<UserLetter, Long> {
}
