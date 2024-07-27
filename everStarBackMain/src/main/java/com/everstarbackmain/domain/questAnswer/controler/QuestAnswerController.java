package com.everstarbackmain.domain.questAnswer.controler;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.questAnswer.message.SuccessQuestAnswerMessage;
import com.everstarbackmain.domain.questAnswer.service.QuestAnswerService;
import com.everstarbackmain.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class QuestAnswerController {

	private final QuestAnswerService questAnswerService;
	private final HttpResponseUtil responseUtil;

	@PostMapping("pets/{pet-id}/quests/{quest-id}/answers")
	public ResponseEntity<Map<String, Object>> createQuestAnswer(Authentication authentication,
		@PathVariable("pet-id") Long petId, @PathVariable("quest-id") Integer questId) {
		questAnswerService.createQuestAnswer(authentication, petId);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(
			SuccessQuestAnswerMessage.SUCCESS_CREATE_QUEST_ANSWER);
		log.info("main server - request : petId {}, questId {}", petId, questId);
		log.info("main server - response : {}", response);
		return response;
	}
 }
