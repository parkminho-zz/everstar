package com.everstarbackmain.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CustomException {

	WRONG_TYPE_EXCEPTION(400, "WrongTypeException", "잘못된 형식의 데이터입니다."),

	NOT_EMPTY_ROLE_EXCEPTION(403, "NotEmptyRoleException", "권한이 존재하지 않습니다."),
	NOT_FOUND_USER_EXCEPTION(404, "NotFoundUserException", "유저가 존재하지 않습니다."),

	EXPIRED_JWT_EXCEPTION(401, "ExpiredJwtException", "토큰이 만료했습니다."),
	NOT_VALID_JWT_EXCEPTION(401, "NotValidJwtException", "토큰이 유효하지 않습니다."),

	ACCESS_DENIED_EXCEPTION(403, "AccessDeniedException", "권한이 없습니다"),

	NOT_FOUND_PET_EXCEPTION(404, "NotFoundPetException", "반려동물이 존재하지 않습니다."),

	NOT_FOUND_MEMORIAL_BOOK_EXCEPTION(404, "NotFoundMemorialBookException", "메모리얼북이 존재하지 않습니다."),
	NOT_ACTIVATED_MEMORIAL_BOOK_EXCEPTION(400, "NotActivatedMemorialBookException", "메모리얼북이 활성화 상태가 아닙니다."),
	NOT_MY_MEMORIAL_BOOK_EXCEPTION(403, "NotMyMemorialBookException", "사용자의 메모리얼북이 아닙니다.")
	;

	private int statusNum;
	private String errorCode;
	private String errorMessage;
}
