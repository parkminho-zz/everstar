package com.everstarbackauth.domain.user.requestDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

public class SmsRequestDto {

	@Getter
	@Setter
	public static class SmsCertificationRequest {

		@NotBlank
		@Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$")
		private String phone;
		private String certificationNumber;
	}
}
