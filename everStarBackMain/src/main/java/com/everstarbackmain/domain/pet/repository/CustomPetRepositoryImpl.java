package com.everstarbackmain.domain.pet.repository;

import static com.everstarbackmain.domain.pet.model.QPet.*;
import static com.everstarbackmain.domain.pet.model.QPetPersonality.*;

import java.util.Optional;

import com.everstarbackmain.domain.pet.model.Pet;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomPetRepositoryImpl implements CustomPetRepository {

	private final JPAQueryFactory queryFactory;

	public CustomPetRepositoryImpl(EntityManager entityManager) {
		this.queryFactory = new JPAQueryFactory(entityManager);
	}

	@Override
	public Optional<Pet> findPetWithPetPersonalities(Long petId, boolean isDeleted) {
		Pet result = queryFactory
			.selectFrom(pet)
			// .leftJoin(pet.petPersonalities, petPersonality).fetchJoin() -> Qpet 수정이 안됨
			.where(pet.id.eq(petId)
				.and(pet.isDeleted.eq(isDeleted)))
			.fetchOne();

		return Optional.ofNullable(result);
	}
}
