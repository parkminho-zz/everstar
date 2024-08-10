package com.everstarbackmain.domain.quest.util;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Component;

import com.everstarbackmain.domain.quest.service.QuestService;
import com.everstarbackmain.domain.user.model.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class QuestScheduler {

	private final TaskScheduler taskScheduler;
	private final QuestService questService;

	// 다음 날 퀘스트 스케줄링
	public void scheduleNextDayQuest(User user, Long petId) {
		LocalTime questReceptionTime = user.getQuestReceptionTime();
		// LocalDateTime nextQuestTime = LocalDateTime.of(LocalDate.now().plusDays(1), questReceptionTime);
		LocalDateTime nextQuestTime = LocalDateTime.now().plusSeconds(10);
		Date nextQuestDate = Date.from(nextQuestTime.atZone(ZoneId.systemDefault()).toInstant());

		taskScheduler.schedule(() -> questService.changePetQuestCompleted(petId), nextQuestDate);
	}
}
