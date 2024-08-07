package com.everstarbackmain.domain.notification.requestdto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NotificationCreateRequestDto {

	@NotBlank
	private String deviceToken;
}
