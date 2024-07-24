package com.everstarbackmain.domain.questAnswer.model;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.domain.quest.model.QuestType;
import com.everstarbackmain.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "quest_answer")
public class QuestAnswer extends BaseTimeEntity {

	@EmbeddedId
	private QuestAnswerId id;

	@MapsId("petId")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pet_id")
	private Pet pet;

	@MapsId("questId")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "quest_id")
	private Quest quest;

	private String content;

	private String imageUrl;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private QuestType type;

	@Column(nullable = false)
	private Boolean isDeleted;

	@Builder
	public QuestAnswer(Pet pet, Quest quest, String content, String imageUrl, QuestType type) {
		this.pet = pet;
		this.quest = quest;
		this.content = content;
		this.imageUrl = imageUrl;
		this.type = type;
		isDeleted = false;
	}
}
