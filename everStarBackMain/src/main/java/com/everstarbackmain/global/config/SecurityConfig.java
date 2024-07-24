package com.everstarbackmain.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.everstarbackmain.global.security.exceptionHandler.CustomExceptionHandler;
import com.everstarbackmain.global.security.jwt.JwtAuthorizationFilter;
import com.everstarbackmain.global.security.jwt.JwtUtil;
import com.everstarbackmain.global.util.HttpResponseUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final AuthenticationConfiguration authenticationConfiguration;
	private final JwtUtil jwtUtil;
	private final ObjectMapper objectMapper;
	private final CustomExceptionHandler customExceptionHandler;
	private final HttpResponseUtil responseUtil;

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
		return configuration.getAuthenticationManager();
	}

	@Bean
	public JwtAuthorizationFilter jwtAuthenticationFilter() throws Exception{
		JwtAuthorizationFilter filter = new JwtAuthorizationFilter(jwtUtil, objectMapper, responseUtil);
		filter.setFilterProcessesUrl("/api/auth/login");
		filter.setAuthenticationManager(authenticationManager(authenticationConfiguration));
		return filter;
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf((auth) -> auth.disable());
		http.formLogin((auth) -> auth.disable());
		http.httpBasic((auth) -> auth.disable());
		http.sessionManagement((session) -> session
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		);
		http.authorizeHttpRequests((auth) -> auth
				.requestMatchers("/api/auth/login", "/api/auth/join").permitAll()
				.anyRequest().authenticated()
		);
		http.exceptionHandling((handle) -> handle.authenticationEntryPoint(customExceptionHandler));
		http.addFilterAt(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
}
