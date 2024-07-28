package com.everstarbackmain.domain.memorialBook.responseDto;

import com.everstarbackmain.domain.memorialBook.model.MemorialBook;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class MemorialBookInfoResponseDto {

	private Long id;
	private String psychologicalTestResult;
	private Boolean isOpen;
	private Boolean isActive;

	public static MemorialBookInfoResponseDto createMemorialBookDetailResponseDto(MemorialBook memorialBook) {
		return MemorialBookInfoResponseDto.builder()
			.id(memorialBook.getId())
			.psychologicalTestResult(memorialBook.getPsychologicalTestResult())
			.isOpen(memorialBook.getIsOpen())
			.isActive(memorialBook.getIsActive())
			.build();
	}
}
