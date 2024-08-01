package com.everstarbackmain.domain.pet.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.everstarbackmain.domain.pet.requestDto.CreatePetRequestDto;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "pet")
public class Pet extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "age", nullable = false)
	private Integer age;

	@Column(name = "memorial_date", nullable = false)
	private LocalDate memorialDate;

	@Column(name = "species", nullable = false)
	private String species;

	@Column(name = "gender", nullable = false)
	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Column(name = "relationship", nullable = false)
	private String relationship;

	@Column(name = "profile_image_url", nullable = false)
	private String profileImageUrl;

	@Column(name = "introduction", nullable = false)
	private String introduction;

	@Column(name = "quest_index", nullable = false)
	private Integer questIndex;

	@Column(name = "is_deleted", nullable = false)
	private Boolean isDeleted;

	@Column(name = "last_access_time", nullable = false)
	private LocalDateTime lastAccessTime;

	@Builder
	private Pet(User user, String name, Integer age, LocalDate memorialDate, String species, Gender gender,
		String relationship, String profileImageUrl, String introduction) {
		this.user = user;
		this.name = name;
		this.age = age;
		this.memorialDate = memorialDate;
		this.species = species;
		this.gender = gender;
		this.relationship = relationship;
		this.profileImageUrl = profileImageUrl;
		this.introduction = (introduction != null && !introduction.isEmpty()) ? introduction : name + " 의 사랑스런 소개글을 작성 해주세요";
		questIndex = 0;
		isDeleted = false;
		lastAccessTime = LocalDateTime.now();
	}

	public static Pet createPet(User user, CreatePetRequestDto createPetRequestDto) {
		return Pet.builder()
			.user(user)
			.name(createPetRequestDto.getName())
			.age(createPetRequestDto.getAge())
			.memorialDate(createPetRequestDto.getMemorialDate())
			.species(createPetRequestDto.getSpecies())
			.gender(createPetRequestDto.getGender())
			.relationship(createPetRequestDto.getRelationship())
			.profileImageUrl(createPetRequestDto.getProfileImageUrl())
			.build();
	}

	public void plusQuestIndex() {
		questIndex++;
	}

	// 기본 소개글 수정(not blank)시 null일 때 = 즉 else문 어떻게 쓸지 잘 모르겠습니다.
	public void updatePetIntroduction(String newIntroduction) {
		if (newIntroduction != null && !newIntroduction.isEmpty()) {
			this.introduction = newIntroduction;
		} else {
			this.introduction = this.name + " 의 사랑스런 소개글을 작성 해주세요";
		}

	}

}
