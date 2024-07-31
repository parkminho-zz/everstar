package com.everstarbackmain.domain.questAnswer.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.everstarbackmain.domain.questAnswer.model.QQuestAnswer;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class QuestAnswerCustomRepositoryImpl implements QuestAnswerCustomRepository {

	private final JPAQueryFactory queryFactory;
	private final JPAQueryFactory jpaQueryFactory;

	public QuestAnswerCustomRepositoryImpl(JPAQueryFactory queryFactory, JPAQueryFactory jpaQueryFactory) {
		this.queryFactory = queryFactory;
		this.jpaQueryFactory = jpaQueryFactory;
	}

	@Override
	public List<String> findContentByPetIdAndSpecificQuestIds(Long petId, Integer firstQuestId, Integer secondQuestId) {
		QQuestAnswer questAnswer = QQuestAnswer.questAnswer;
		return queryFactory.select(questAnswer.content)
			.from(questAnswer)
			.where(questAnswer.pet.id.eq(petId)
				.and(questAnswer.quest.id.in(firstQuestId, secondQuestId)))
			.fetch();
	}
}
