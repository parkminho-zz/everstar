package com.everstarbackmain.domain.cheeringMessage.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.everstarbackmain.domain.cheeringMessage.model.CheeringMessage;
import com.everstarbackmain.domain.cheeringMessage.responseDto.CheeringMessageResponseDto;

@Repository
public interface CheeringMessageRepository extends JpaRepository<CheeringMessage, Long>, CheeringMessageRepositoryCustom {

	@Override
	Page<CheeringMessageResponseDto> findCheeringMessagesByPetId(Long petId, Pageable pageable);
}
