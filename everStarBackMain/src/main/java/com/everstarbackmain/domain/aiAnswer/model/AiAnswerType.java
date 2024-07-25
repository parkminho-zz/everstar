package com.everstarbackmain.domain.aiAnswer.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public enum AiAnswerType {

	TEXT("TEXT"),
	TEXT_IMAGE("TEXT_IMAGE"),
	WEBRTC("MUSIC");

	private String type;

}
