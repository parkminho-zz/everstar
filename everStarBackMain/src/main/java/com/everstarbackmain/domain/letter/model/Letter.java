package com.everstarbackmain.domain.letter.model;

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
public class Letter extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pet_id")
	private Pet pet;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "letter_id")
	private Letter letter;

	@Column(nullable = false)
	private boolean isRead;

	@Column(nullable = false)
	private boolean isUsersSend;

	@Column(nullable = false)
	private boolean is_deleted;

	@Column(nullable = false)
	private String content;

	@Column(nullable = false)
	private String imgUrl;

	@Builder
	private Letter(Pet pet, Letter letter, boolean isRead, String content, String imgUrl, boolean is_deleted,
		boolean isUsersSend) {
		this.pet = pet;
		this.letter = letter;
		this.isRead = isRead;
		this.content = content;
		this.imgUrl = imgUrl;
		this.is_deleted = is_deleted;
		this.isUsersSend = isUsersSend;
	}
}
