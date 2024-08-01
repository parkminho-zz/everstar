package com.everstarbackmain.domain.petterLetter.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Component;
import com.everstarbackmain.domain.petterLetter.service.PetLetterService;
import com.everstarbackmain.domain.userLetter.model.UserLetter;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PetLetterScheduler {

	private final TaskScheduler taskScheduler;
	private final PetLetterService petLetterService;

	public void schedulePetLetter(UserLetter userLetter){
		LocalDateTime nextDayWritePetLetterTime = userLetter.getCreatedTime().plusDays(1);
		Date nextDayWritePetLetterDate = Date.from(nextDayWritePetLetterTime.atZone(ZoneId.systemDefault()).toInstant());

	}
}
