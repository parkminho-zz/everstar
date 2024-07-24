package com.everstarbackmain.domain.quest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.everstarbackmain.domain.quest.model.Quest;

public interface QuestRepository extends JpaRepository<Quest, Long> {
}
