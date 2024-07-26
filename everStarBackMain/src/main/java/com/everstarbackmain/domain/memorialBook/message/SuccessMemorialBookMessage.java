package com.everstarbackmain.domain.memorialBook.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessMemorialBookMessage {

	SUCCESS_CHANGE_OPEN_STATUS("메모리얼북 공개 여부 수정을 성공하였습니다.");

	private String message;
}
