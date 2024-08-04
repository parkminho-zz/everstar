package com.everstarbackmain.domain.cheeringMessage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.everstarbackmain.domain.cheeringMessage.model.CheeringMessage;

@Repository
public interface CheeringMessageRepository extends JpaRepository<CheeringMessage, Long> {
}
