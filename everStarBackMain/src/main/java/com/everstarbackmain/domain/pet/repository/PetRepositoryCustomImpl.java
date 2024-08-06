package com.everstarbackmain.domain.pet.repository;

import com.everstarbackmain.domain.pet.model.QPet;
import com.everstarbackmain.domain.pet.model.QPetPersonality;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Repository
public class PetRepositoryCustomImpl implements PetRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public PetRepositoryCustomImpl(JPAQueryFactory queryFactory) {
		this.queryFactory = queryFactory;
	}

	@Override
	public List<String> findPetPersonalitiesByIdAndIsDeleted(Long petId, Boolean isDeleted) {
		QPetPersonality petPersonality = QPetPersonality.petPersonality;
		return queryFactory
			.select(petPersonality.personalityValue)
			.from(petPersonality)
			.where(petPersonality.pet.id.eq(petId)
				.and(petPersonality.isDeleted.eq(isDeleted)))
			.fetch();
	}

	@Override
	public Long findRandomActivePetIdExcluding(Long excludedPetId) {
		QPet pet = QPet.pet;

		List<Long> petIds = queryFactory
			.select(pet.id)
			.from(pet)
			.where(pet.isDeleted.eq(false)
				.and(pet.id.ne(excludedPetId)))
			.fetch();

		if (petIds.isEmpty()) {
			return null;
		}

		return petIds.get(ThreadLocalRandom.current().nextInt(petIds.size()));
	}
}
