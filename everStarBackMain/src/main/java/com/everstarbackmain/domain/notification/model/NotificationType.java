package com.everstarbackmain.domain.notification.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public enum NotificationType {

	DONE("DONE"),
	NEWQUEST("NEWQUEST");

	private final String notificationType;
}
