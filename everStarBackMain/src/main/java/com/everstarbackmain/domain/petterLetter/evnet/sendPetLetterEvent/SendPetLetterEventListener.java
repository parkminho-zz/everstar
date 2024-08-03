package com.everstarbackmain.domain.petterLetter.evnet.sendPetLetterEvent;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.pet.model.Pet;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class SendPetLetterEventListener {

	@Transactional
	@Async
	public void writePetLetter(Pet pet){

	}
}
