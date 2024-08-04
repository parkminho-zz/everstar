package com.everstarbackmain.domain.cheeringMessage.model;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "cheering_message")
public class CheeringMessage extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pet_id")
	private Pet pet;

	@Column(nullable = false)
	private boolean isDeleted;

	@Column(nullable = false)
	private boolean isAnonymous;

	@Column
	private String content;

	@Builder
	private CheeringMessage(Pet pet, boolean isDeleted, boolean isAnonymous, String content) {
		this.pet = pet;
		this.isDeleted = isDeleted;
		this.isAnonymous = isAnonymous;
		this.content = content;
	}
}
