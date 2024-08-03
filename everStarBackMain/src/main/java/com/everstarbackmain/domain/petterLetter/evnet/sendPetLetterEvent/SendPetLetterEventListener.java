package com.everstarbackmain.domain.petterLetter.evnet.sendPetLetterEvent;

import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.petterLetter.model.PetLetter;
import com.everstarbackmain.domain.userLetter.repository.UserLetterRepository;
import com.everstarbackmain.global.openai.util.OpenAiClient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class SendPetLetterEventListener {

	private final OpenAiClient openAiClient;
	private final UserLetterRepository userLetterRepository;

	@EventListener
	@Transactional
	@Async
	public void writePetLetter(SendPetLetterEvent event) {
		Pet pet = event.getPet();
		String content =
		PetLetter petLetter = PetLetter.writePetLetter(pet,)

	}
}
