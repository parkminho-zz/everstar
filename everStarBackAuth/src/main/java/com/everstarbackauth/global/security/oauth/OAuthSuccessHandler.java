package com.everstarbackauth.global.security.oauth;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.everstarbackauth.domain.user.model.User;
import com.everstarbackauth.global.security.auth.PrincipalDetails;
import com.everstarbackauth.global.security.jwt.JwtUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {
	private final JwtUtil jwtUtil;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {
		User user = ((PrincipalDetails) authentication.getPrincipal()).getUser();
		String token = jwtUtil.getAccessToken(user);
		log.info("auth-server accesstoken : {}", token);
		response.sendRedirect(makeRedirectUrl(token));
	}

	private String makeRedirectUrl(String token) {
		return UriComponentsBuilder.fromUriString("https://capsuletalk.site/oauth/" + token)
			.build()
			.toString();
	}
}
