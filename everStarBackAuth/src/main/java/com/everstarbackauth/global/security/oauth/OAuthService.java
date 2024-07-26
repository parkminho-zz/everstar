package com.everstarbackauth.global.security.oauth;

import java.lang.reflect.Member;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.everstarbackauth.domain.user.model.Role;
import com.everstarbackauth.domain.user.model.User;
import com.everstarbackauth.domain.user.repository.UserRepository;
import com.everstarbackauth.global.exception.CustomException;
import com.everstarbackauth.global.exception.ExceptionResponse;
import com.everstarbackauth.global.security.auth.PrincipalDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuthService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

	private final UserRepository userRepository;
	private final DefaultOAuth2UserService delegate;
	private final OAuthAttributeService oauthAttributeService;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = delegate.loadUser(userRequest);
		String id = oauthAttributeService.getRegistrationId(userRequest);
		OAuthAttribute oauthAttribute = oauthAttributeService.getOauthAttribute(oAuth2User, id);
		User user =
			!userRepository.existsByEmailAndIsDeleted(oauthAttribute.getEmail(), false) ? createMember(oauthAttribute) :
				findUser(oauthAttribute);
		return new PrincipalDetails(user, oAuth2User.getAttributes());
	}

	private User createMember(OAuthAttribute oauthAttribute) {
		if (userRepository.existsByEmailAndIsDeleted(oauthAttribute.getEmail(), true))
			throw new OAuth2AuthenticationException(
				CustomException.EXIST_EMAIL.getErrorCode());
		User user = User.oAuthSignUpUser(oauthAttribute.getEmail(), oauthAttribute.getName());

		userRepository.save(user);
		return user;
	}

	private User findUser(OAuthAttribute oauthAttribute) {
		return userRepository.findUserByEmailIsDeleted(oauthAttribute.getEmail(), false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_EXIST_EMAIL));
	}
}
