package com.everstarbackmain.domain.pet.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessPetMessage {

	SUCCESS_CREATE_PET("반려동물 추가를 성공하였습니다."),
	SUCCESS_UPDATE_PET_INTRODUCTION("반려동물 소개글이 수정 되었습니다."),
	SUCCESS_GET_ALL_ENROLLED_PET("등록된 반려동물 목록 조회성공");

	private final String message;
}
