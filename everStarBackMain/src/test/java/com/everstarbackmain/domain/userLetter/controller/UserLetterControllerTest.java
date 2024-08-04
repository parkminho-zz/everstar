package com.everstarbackmain.domain.userLetter.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.requestDto.CreatePetRequestDto;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.domain.userLetter.message.SuccessUserLetterMessage;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.domain.userLetter.requestDto.WriteLetterRequestDto;
import com.everstarbackmain.domain.userLetter.service.UserLetterService;
import com.everstarbackmain.global.auth.WithMockAuthUser;
import com.everstarbackmain.global.config.SecurityConfig;
import com.everstarbackmain.global.util.HttpResponseUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(
	controllers = UserLetterController.class,
	excludeFilters = {
		@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
	}
)
@MockBean(JpaMetamodelMappingContext.class)
public class UserLetterControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private UserLetterService userLetterService;

	@MockBean
	private HttpResponseUtil responseUtil;

	@Mock
	private Authentication authentication;

	private User user;
	private Pet pet;
	private UserLetter userLetter;
	private WriteLetterRequestDto requestDto;

	@BeforeEach
	public void setUp() throws Exception {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));

		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", "profileImageUrl", List.of("개구쟁이", "귀염둥이")));

		requestDto = new WriteLetterRequestDto("dd", "dd");
		userLetter = UserLetter.writeLetterHasImage(pet, requestDto);
	}

	@Test
	@DisplayName("유저 편지 쓰기 성공 테스트")
	@WithMockAuthUser(email = "test@gmail.com", role = Role.ROLE_USER)
	public void 유저_편지_쓰기_성공_테스트() throws Exception {
		//given
		String requestBody = objectMapper.writeValueAsString(requestDto);
		Map<String, Object> response = new HashMap<>();
		response.put("data", SuccessUserLetterMessage.SUCCESS_WRITE_LETTER);

		BDDMockito.doNothing().when(userLetterService).writeLetter(authentication, 1L, requestDto);

		ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/api/pets/1/letters")
			.with(SecurityMockMvcRequestPostProcessors.csrf())
			.contentType(MediaType.APPLICATION_JSON)
			.content(requestBody));

		result.andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	@DisplayName("유저 편지 답장 성공 테스트")
	@WithMockAuthUser(email = "test@gmail.com", role = Role.ROLE_USER)
	public void 유저_편지_답장_성공_테스트() throws Exception {
		String requestBody = objectMapper.writeValueAsString(requestDto);
		Map<String, Object> response = new HashMap<>();
		response.put("data", SuccessUserLetterMessage.SUCCESS_WRITE_LETTER_ANSWER);

		BDDMockito.doNothing().when(userLetterService).writeLetterAnswer(authentication, 1L, 1L, requestDto);

		ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/api/pets/1/letters/1")
			.with(SecurityMockMvcRequestPostProcessors.csrf())
			.contentType(MediaType.APPLICATION_JSON)
			.content(requestBody));

		result.andExpect(MockMvcResultMatchers.status().isOk());
	}
}
