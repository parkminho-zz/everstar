package com.everstarbackmain.domain.aiAnswer.requestdto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CreateAiAnswerRequestDto {

	@NotBlank
	private String content;

	private String imageUrl;

	@NotBlank
	private String type;

}
