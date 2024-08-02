package com.everstarbackmain.domain.petterLetter.responseDto.getLetterResponseDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class GetLetterResponseDto {

	private GetUserLetterResponseDto userLetter;
	private GetPetLetterResponseDto petLetter;
}
