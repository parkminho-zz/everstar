package com.everstarbackmain.domain.aiAnswer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.everstarbackmain.domain.aiAnswer.model.AiAnswer;

public interface AiAnswerRepository extends JpaRepository<AiAnswer, Long> {
}
