package com.everstarbackmain.domain.pet.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessPetMessage {

	SUCCESS_CREATE_PET("반려동물 추가를 성공하였습니다.");

	private String message;
}
