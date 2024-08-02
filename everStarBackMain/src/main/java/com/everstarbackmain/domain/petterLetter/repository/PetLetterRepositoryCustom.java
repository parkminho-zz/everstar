package com.everstarbackmain.domain.petterLetter.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.everstarbackmain.domain.petterLetter.responseDto.PetLetterResponseDto;
import com.everstarbackmain.domain.user.model.User;

public interface PetLetterRepositoryCustom {

	Page<PetLetterResponseDto> findPetLettersByPetIdAndIsDelete(User user, Long petId, Pageable pageable);
}
