package com.everstarbackmain.domain.pet.responseDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class EverStarPetInfoResponseDto {

	private Long id;
	private String profileImageUrl;
	private String name;
	private String Introduction;
}
