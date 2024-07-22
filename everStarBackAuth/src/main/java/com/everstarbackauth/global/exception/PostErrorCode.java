package com.everstarbackauth.global.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PostErrorCode implements ErrorCode {
	DUPLICATED_POST_REGISTER(HttpStatus.BAD_REQUEST, "Duplicated post register...");
	private final HttpStatus httpStatus;
	private final String message;

}

