package com.everstarbackmain.domain.pet.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.pet.message.SuccessPetMessage;
import com.everstarbackmain.domain.pet.requestDto.CreatePetRequestDto;
import com.everstarbackmain.domain.pet.requestDto.UpdatePetIntroductionDto;
import com.everstarbackmain.domain.pet.responseDto.EnrolledPetsResponseDto;
import com.everstarbackmain.domain.pet.service.PetService;
import com.everstarbackmain.global.util.HttpResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pets")
@Slf4j(topic = "elk")
public class PetController {

	private final PetService petService;
	private final HttpResponseUtil responseUtil;

	@PostMapping
	public ResponseEntity<Map<String, Object>> addPet(Authentication authentication,
		@RequestBody @Valid CreatePetRequestDto requestDto) {
		petService.createPet(authentication, requestDto);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(
			SuccessPetMessage.SUCCESS_CREATE_PET);
		log.info("main server - request : {}", requestDto);
		log.info("main server - response : {}", response);
		return response;
	}

	@PutMapping("/{pet-id}")
	public ResponseEntity<Map<String, Object>> updatePetIntroduction(
		@PathVariable("pet-id") Long petId, @RequestBody @Valid UpdatePetIntroductionDto requestDto) {
		petService.updatePetIntroduction(petId, requestDto);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(
			SuccessPetMessage.SUCESS_UPDATE_PET_INTRODUCTION);

		log.info("main server - request : {}", requestDto);
		log.info("main-server - response : {}", response);
		return response;
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllUserPets(Authentication authentication) {
		List<EnrolledPetsResponseDto> responseDto = petService.getAllUserPets(authentication);
		ResponseEntity<Map<String,Object>> response = responseUtil.createResponse(SuccessPetMessage.SUCESS_GET_ALL_ENROLLED_PET);
		log.info("main server - request : user {},", authentication);
		log.info("main server - response : 유저 반려동물 목록{}", responseDto);
		return response;
	}
}