package com.everstarbackmain.domain.questAnswer.requestDto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CreateAnswerRequestDto {

	@NotBlank
	private String content;

	private String imageUrl;

	@NotBlank
	private String type;

}
