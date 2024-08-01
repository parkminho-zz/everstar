package com.everstarbackmain.domain.pet.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public enum Gender {

	MALE("MALE"),
	FEMALE("FEMALE");

	private final String gender;
}
