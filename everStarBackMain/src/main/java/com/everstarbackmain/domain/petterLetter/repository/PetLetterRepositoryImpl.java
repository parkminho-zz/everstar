package com.everstarbackmain.domain.petterLetter.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import com.everstarbackmain.domain.petterLetter.model.PetLetter;
import com.everstarbackmain.domain.petterLetter.model.QPetLetter;
import com.everstarbackmain.domain.petterLetter.responseDto.PetLetterResponseDto;
import com.everstarbackmain.domain.user.model.User;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PetLetterRepositoryImpl implements PetLetterRepositoryCustom {

	private final JPAQueryFactory jpaQueryFactory;
	private QPetLetter petLetter = QPetLetter.petLetter;

	@Override
	public Page<PetLetterResponseDto> findPetLettersByPetId(User user, Long petId,
		Pageable pageable) {
		List<PetLetterResponseDto> petLetters = jpaQueryFactory
			.select(Projections.constructor(PetLetterResponseDto.class, petLetter.id,
				petLetter.isRead, petLetter.pet.name, petLetter.content,petLetter.createdTime))  // Assuming QPetLetterResponseDto is a QueryDSL projection class
			.from(petLetter)
			.where(petLetter.isDeleted.isFalse().and(petLetter.pet.id.eq(petId).and(petLetter.pet.user.eq(user))))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		long total = jpaQueryFactory
			.selectFrom(petLetter)
			.where(petLetter.isDeleted.isFalse())
			.fetchCount();

		return new PageImpl<>(petLetters, pageable, total);

	}
}
