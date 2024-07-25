package com.everstarbackmain.domain.pet.requestDto;

import java.time.LocalDate;
import java.util.List;

import com.everstarbackmain.domain.user.model.Gender;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CreatePetRequestDto {

	@NotBlank
	private String name;

	@NotNull
	private Integer age;

	@NotNull
	private LocalDate memorialDate;

	@NotBlank
	private String species;

	@NotNull
	private Gender gender;

	@NotBlank
	private String relationship;

	@NotBlank
	private String profileImageUrl;

	@NotBlank
	private String introduction;

	@NotNull
	private List<String> personalities;

}
