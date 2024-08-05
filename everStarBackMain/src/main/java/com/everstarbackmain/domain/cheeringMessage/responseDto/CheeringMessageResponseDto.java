package com.everstarbackmain.domain.cheeringMessage.responseDto;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CheeringMessageResponseDto {
	private Long cheeringMessageId;
	private String content;
	private Boolean isAnonymous;
	private String relationShip;
	private String petName;

	@QueryProjection
	public CheeringMessageResponseDto(Long cheeringMessageId, String content, Boolean isAnonymous, String relationShip,
		String petName) {
		this.cheeringMessageId = cheeringMessageId;
		this.content = content;
		this.isAnonymous = isAnonymous;
		this.relationShip = relationShip;
		this.petName = petName;
	}
}
