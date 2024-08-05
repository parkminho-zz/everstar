package com.everstarbackmain.domain.cheeringMessage.responseDto;

import com.everstarbackmain.domain.cheeringMessage.model.CheeringMessage;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class CheeringMessageDetailResponseDto {

	private String content;
	private Boolean isAnonymous;
	private String relationShip;
	private String petName;

	public static CheeringMessageDetailResponseDto create(CheeringMessage cheeringMessage) {
		return CheeringMessageDetailResponseDto.builder()
			.content(cheeringMessage.getContent())
			.isAnonymous(cheeringMessage.getIsAnonymous())
			.relationShip(cheeringMessage.getBehindPetRelationship())
			.petName(cheeringMessage.getBehindPetName())
			.build();
	}
}
