package com.everstarbackmain.domain.userLetter.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.everstarbackmain.domain.userLetter.model.QUserLetter;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserLetterRepositoryImpl implements UserLetterRepositoryCustom {

	private final JPAQueryFactory queryFactory;
	private QUserLetter userLetter;

	@Override
	public List<UserLetter> getUserLettersWithTimeRange(LocalDateTime startTime, LocalDateTime lastTime) {
		return queryFactory.select(userLetter)
			.where(userLetter.createdTime.between(startTime, lastTime))
			.fetch();
	}
}
