package com.everstarbackmain.domain.user.responseDto;

import java.time.LocalDate;
import java.time.LocalTime;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class UserAccountResponseDto {

	private String email;
	private String userName;
	private String phoneNumber;
	private LocalDate birthDate;
	private Gender gender;
	private LocalTime questReceptionTime;

	public static UserAccountResponseDto createUserAccountResponseDto(User user) {
		return UserAccountResponseDto.builder()
			.email(user.getEmail())
			.userName(user.getUserName())
			.phoneNumber(user.getPhoneNumber())
			.birthDate(user.getBirthDate())
			.gender(user.getGender())
			.questReceptionTime(user.getQuestReceptionTime())
			.build();
	}
}
