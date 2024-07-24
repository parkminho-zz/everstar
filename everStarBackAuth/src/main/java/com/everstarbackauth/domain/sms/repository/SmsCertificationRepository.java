package com.everstarbackauth.domain.sms.repository;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class SmsCertificationRepository {
	private static final String PREFIX = "sms:";
	private static final int LIMIT_TIME_SECONDS = 3 * 60;

	private final StringRedisTemplate stringRedisTemplate;

	public void createSmsCertification(String phone, String certificationNumber) {
		setWithTTL(PREFIX + phone, certificationNumber, LIMIT_TIME_SECONDS);
	}

	public String getSmsCertification(String phone) {
		return stringRedisTemplate.opsForValue().get(PREFIX + phone);
	}

	public void deleteSmsCertification(String phone) {
		stringRedisTemplate.delete(PREFIX + phone);
	}

	public boolean hasKey(String phone) {
		return Boolean.TRUE.equals(stringRedisTemplate.hasKey(PREFIX + phone));
	}

	private void setWithTTL(String key, String value, int ttlSeconds) {
		stringRedisTemplate.opsForValue().set(key, value, Duration.ofSeconds(ttlSeconds));
	}
}