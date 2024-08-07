package com.everstarbackmain.domain.quest.controller;

import static com.everstarbackmain.domain.user.model.QUser.*;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.quest.responseDto.QuestDetailResponseDto;
import com.everstarbackmain.domain.quest.service.QuestService;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.security.auth.PrincipalDetails;
import com.everstarbackmain.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
@Slf4j(topic = "elk")
public class QuestController {

	private final QuestService questService;
	private final HttpResponseUtil responseUtil;

	@GetMapping("/pets/{pet-id}/initialize-quest")
	public ResponseEntity<Map<String, Object>> initializeQuest(Authentication authentication,
		@PathVariable("pet-id") Long petId) {

		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();

		questService.startInitialQuest(user, petId);
		QuestDetailResponseDto responseDto = questService.getQuestDetail(petId, 1L);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);
		log.info("main server - request : petId {}", petId);
		log.info("main server - response : {}", response);
		return response;
	}

	@GetMapping("/pets/{pet-id}/quests/{quest-id}")
	public ResponseEntity<Map<String, Object>> getQuestDetail(@PathVariable("pet-id") Long petId,
		@PathVariable("quest-id") Long questId) {
		QuestDetailResponseDto responseDto = questService.getQuestDetail(petId, questId);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);
		return response;
	}
}
