package com.everstarbackmain.domain.petterLetter.responseDto.getLetterResponseDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
public class GetUserLetterResponseDto {

	private String petName;
	private String content;
}
