package com.everstarbackmain.domain.cheeringMessage.model;

import com.everstarbackmain.domain.cheeringMessage.requestDto.CreateCheeringMessageRequestDto;
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
	private Boolean isDeleted;

	@Column(nullable = false)
	private Boolean isAnonymous;

	@Column(nullable = false)
	private String content;

	@Column
	private String behindPetName;

	@Column
	private String behindPetRelationship;

	@Builder
	private CheeringMessage(Pet pet, Boolean isAnonymous, String content, String behindPetName, String behindPetRelationship) {
		this.pet = pet;
		this.isDeleted = false;
		this.isAnonymous = isAnonymous;
		this.content = content;
		this.behindPetName = behindPetName;
		this.behindPetRelationship = behindPetRelationship;
	}

	public static CheeringMessage createNoAnonymousCheeringMessage(CreateCheeringMessageRequestDto requestDto, Pet findPet, Pet pet) {
		return CheeringMessage.builder()
			.pet(findPet)
			.isAnonymous(requestDto.getIsAnonymous())
			.content(requestDto.getContent())
			.behindPetName(pet.getName())
			.behindPetRelationship(pet.getRelationship())
			.build();
	}

	public static CheeringMessage createAnonymousCheeringMessage(CreateCheeringMessageRequestDto requestDto, Pet findPet) {
		return CheeringMessage.builder()
			.pet(findPet)
			.isAnonymous(requestDto.getIsAnonymous())
			.content(requestDto.getContent())
			.build();
	}

	public void deleteCheeringMessage() {
		this.isDeleted = true;
	}
}
