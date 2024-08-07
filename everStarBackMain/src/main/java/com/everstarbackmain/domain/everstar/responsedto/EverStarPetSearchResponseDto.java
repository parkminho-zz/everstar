package com.everstarbackmain.domain.everstar.responsedto;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class EverStarPetSearchResponseDto {

	private Long id;
	private String petName;
	private String userName;
	private String email;

	@QueryProjection
	public EverStarPetSearchResponseDto(Long id, String petName, String userName, String email) {
		this.petName = petName;
		this.userName = userName;
		this.id = id;
		this.email = email;
	}
}
