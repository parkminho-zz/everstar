package com.everstarbackmain.domain.userLetter.model;

import com.everstarbackmain.domain.userLetter.requestDto.WriteLetterRequestDto;
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
@Table(name = "letter")
public class UserLetter extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pet_id")
	private Pet pet;

	@Column(nullable = false)
	private boolean is_deleted;

	@Column(nullable = false)
	private String content;

	@Column(nullable = false)
	private String imgUrl;

	@Builder
	private UserLetter(Pet pet, String content, String imgUrl, boolean is_deleted) {
		this.pet = pet;
		this.content = content;
		this.imgUrl = imgUrl;
		this.is_deleted = is_deleted;
	}

	public static UserLetter writeLetter(Pet pet, WriteLetterRequestDto writeLetterRequestDto) {
		return UserLetter.builder()
			.pet(pet)
			.isRead(true)

	}
}
