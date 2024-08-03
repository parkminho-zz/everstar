package com.everstarbackmain.domain.pet.responseDto;

import java.time.LocalDate;
import java.util.List;

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
	private Integer age;
	private LocalDate memorialDate;
	private List<String> personalities;

}
