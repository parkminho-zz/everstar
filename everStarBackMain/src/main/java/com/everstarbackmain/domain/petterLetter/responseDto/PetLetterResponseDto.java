package com.everstarbackmain.domain.petterLetter.responseDto;

import com.everstarbackmain.domain.petterLetter.model.PetLetter;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class PetLetterResponseDto {
	private long petLetterId;
	private boolean isRead;

	public static PetLetterResponseDto fromPetLetter(PetLetter petLetter) {
		return PetLetterResponseDto.builder()
			.petLetterId(petLetter.getId())
			.isRead(petLetter.isRead())
			.build();
	}
}
