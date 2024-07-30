package com.everstarbackmain.domain.pet.model;

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
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "pet_personality")
public class Personality {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pet_id")
	private Pet pet;

	@Column(nullable = false)
	private String personalityValue;

	private Boolean isDeleted;

	private Personality(Pet pet, String personalityValue) {
		this.pet = pet;
		this.personalityValue = personalityValue;
		isDeleted = false;
	}

	public static Personality createPersonality(Pet pet, String personalityValue) {
		return new Personality(pet, personalityValue);
	}

}
