package com.everstarbackmain.domain.petterLetter.util;

import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PetLetterScheduler {

	private final TaskScheduler taskScheduler;
}
