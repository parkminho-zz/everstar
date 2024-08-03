package com.everstarbackmain.domain.petterLetter.model;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "pet_letter")
public class PetLetter extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pet_id")
	private Pet pet;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_letter_id")
	private UserLetter userLetter;

	@Column(nullable = false)
	private boolean isRead;

	@Column(nullable = false)
	private boolean isDeleted;

	@Lob
	@Column(nullable = false, columnDefinition = "TEXT")
	private String content;

	@Builder
	private PetLetter(Pet pet, UserLetter userLetter, boolean isRead, String content) {
		this.pet = pet;
		this.userLetter = userLetter;
		this.isRead = isRead;
		this.isDeleted = false;
		this.content = content;
	}

	public static PetLetter writePetLetterAnswer(UserLetter userLetter, String content) {
		return PetLetter.builder()
			.pet(userLetter.getPet())
			.userLetter(userLetter)
			.isRead(false)
			.content(content)
			.build();
	}
}
