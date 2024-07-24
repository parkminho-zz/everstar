package com.everstarbackauth.global.security.jwt;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.eternitystar.domain.user.model.User;
import com.eternitystar.global.config.JwtValueConfig;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtUtil {

	private final JwtValueConfig config;

	public String getUserEmail(String token) {
		return Jwts.parser().verifyWith(config.getKey()).build().parseSignedClaims(token).getPayload().get("userEmail",String.class);
	}

    public String getAccessToken(User user, Long expiredMs) {
    	return Jwts.builder()
                .claim("userEmail", user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(config.getKey())
                .compact();
    }
}
