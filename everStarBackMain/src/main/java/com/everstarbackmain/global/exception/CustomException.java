package com.everstarbackmain.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CustomException {

	NOT_EMPTY_ROLE_EXCEPTION(400, "NotEmptyRoleException", "권한이 존재하지 않습니다."),
	NOT_FOUND_USER_EXCEPTION(400, "NotFoundUserException", "유저가 존재하지 않습니다."),

	EXPIRED_JWT_EXCEPTION(401, "ExpiredJwtException", "토큰이 만료했습니다."),
	NOT_VALID_JWT_EXCEPTION(401, "NotValidJwtException", "토큰이 유효하지 않습니다."),

	ACCESS_DENIEND_EXCEPTION(403, "AccessDeniendException", "권한이 없습니다");

	private int statusNum;
	private String errorCode;
	private String errorMessage;
}
