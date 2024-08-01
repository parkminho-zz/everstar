package com.everstarbackmain.domain.pet.responseDto;

import com.everstarbackmain.domain.pet.model.Pet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrolledPetsResponseDto {

	private String profileImageUrl;
	private String name;

	public static EnrolledPetsResponseDto createEnrolledResponseDto(Pet pet) {
		return EnrolledPetsResponseDto.builder()
			.profileImageUrl(pet.getProfileImageUrl())
			.name(pet.getName())
			.build();
	}
}
