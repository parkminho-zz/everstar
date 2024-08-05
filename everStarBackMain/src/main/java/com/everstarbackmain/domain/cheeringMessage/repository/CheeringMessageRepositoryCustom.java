package com.everstarbackmain.domain.cheeringMessage.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.everstarbackmain.domain.cheeringMessage.responseDto.CheeringMessageResponseDto;

public interface CheeringMessageRepositoryCustom {

	Page<CheeringMessageResponseDto> findCheeringMessagesByPetId(Long petId, Pageable pageable);
}
