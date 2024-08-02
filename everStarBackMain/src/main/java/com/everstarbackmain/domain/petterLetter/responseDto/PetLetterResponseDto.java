package com.everstarbackmain.domain.petterLetter.responseDto;

import com.everstarbackmain.domain.petterLetter.model.PetLetter;
import com.querydsl.core.annotations.QueryProjection;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PetLetterResponseDto {
	private long petLetterId;
	private boolean isRead;


	@QueryProjection
	public PetLetterResponseDto(Long id, Boolean isRead) {
		this.petLetterId = id;
		this.isRead = isRead;
	}

	public static PetLetterResponseDto fromPetLetter(PetLetter petLetter) {
		return PetLetterResponseDto.builder()
			.petLetterId(petLetter.getId())
			.isRead(petLetter.isRead())
			.build();
	}
}
