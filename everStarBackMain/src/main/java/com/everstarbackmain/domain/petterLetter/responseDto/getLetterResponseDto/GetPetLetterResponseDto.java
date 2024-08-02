package com.everstarbackmain.domain.petterLetter.responseDto.getLetterResponseDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
public class GetPetLetterResponseDto {

	private String relationship;
	private String content;
}
