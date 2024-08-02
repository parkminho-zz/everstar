package com.everstarbackauth.domain.sms.requestDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckCodeRequestDto {

	@NotBlank(message = "전화번호는 필수 입력 값입니다.")
	@Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$", message = "전화번호는 공백, '-', '.' 없이 숫자만 입력해야 합니다.")
	private String phone;

	@NotBlank(message = "인증번호는 필수 입력 값입니다.")
	@Pattern(regexp = "^[0-9]{5}$", message = "인증번호는 숫자 5개를 공백 없이 입력해야 합니다.")
	private String certificationNumber;
}
