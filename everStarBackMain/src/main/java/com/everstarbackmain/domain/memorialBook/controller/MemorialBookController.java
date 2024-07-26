package com.everstarbackmain.domain.memorialBook.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.memorialBook.message.SuccessMemorialBookMessage;
import com.everstarbackmain.domain.memorialBook.service.MemorialBookService;
import com.everstarbackmain.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pets/{pet-id}/memorialbooks")
@Slf4j
public class MemorialBookController {

	private final MemorialBookService memorialBookService;
	private final HttpResponseUtil responseUtil;

	@PatchMapping("/{memorialbook-id}/is-open")
	public ResponseEntity<Map<String ,Object>> changeOpenStatus(@PathVariable("pet-id") Long petId, @PathVariable("memorialbook-id") Long memorialBookId) {

		memorialBookService.changeOpenStatus(memorialBookId);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(
			SuccessMemorialBookMessage.SUCCESS_CHANGE_OPEN_STATUS);
		log.info("main server - request : petId {}, memorialBookId {}", petId, memorialBookId);
		log.info("main server - response : {}", response);
		return response;
	}
}
