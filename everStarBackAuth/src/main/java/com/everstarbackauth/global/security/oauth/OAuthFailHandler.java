package com.everstarbackauth.global.security.oauth;

import java.io.IOException;

import javax.naming.AuthenticationException;

import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "logs")
public class OAuthFailHandler implements AuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
		org.springframework.security.core.AuthenticationException exception) throws IOException, ServletException {
		log.error("main server - error : {}", exception);
		response.sendRedirect(makeRedirectUrl());
	}

	private String makeRedirectUrl() {
		return UriComponentsBuilder.fromUriString("https://i11b101.p.ssafy.io/login/")
			.build()
			.toString();
	}
}