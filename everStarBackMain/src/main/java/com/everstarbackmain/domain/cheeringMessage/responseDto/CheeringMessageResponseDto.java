package com.everstarbackmain.domain.cheeringMessage.responseDto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CheeringMessageResponseDto {
	private Long cheeringMessageId;
	private String content;
	private Boolean isAnonymous;

}
