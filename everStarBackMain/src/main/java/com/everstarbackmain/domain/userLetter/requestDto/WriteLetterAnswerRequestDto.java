package com.everstarbackmain.domain.userLetter.requestDto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class WriteLetterAnswerRequestDto {

	@NotBlank
	private String content;

	private String imageUrl;

	public WriteLetterAnswerRequestDto(String content) {
		this.content = content;
	}
}
