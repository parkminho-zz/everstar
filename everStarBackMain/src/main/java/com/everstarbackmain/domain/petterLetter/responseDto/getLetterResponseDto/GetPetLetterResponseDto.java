package com.everstarbackmain.domain.petterLetter.responseDto.getLetterResponseDto;

import java.time.LocalDateTime;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.petterLetter.model.PetLetter;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class GetPetLetterResponseDto {

	private String relationship;
	private String content;

	public static GetPetLetterResponseDto createGetPetLetterResponseDto(PetLetter petLetter) {
		Pet pet = petLetter.getPet();
		return new GetPetLetterResponseDto(pet.getRelationship(), petLetter.getContent(), petLetter.getCreatedTime());
	}
}
