package com.everstarbackmain.domain.sse;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@NoArgsConstructor
@Slf4j(topic = "elk")
public class EmitterRepositoryImpl implements EmitterRepository {

	private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

	@Override
	public SseEmitter save(Long petId, SseEmitter sseEmitter) {
		emitters.put(petId, sseEmitter);
		return sseEmitter;
	}

	@Override
	public SseEmitter findEmitterByPetId(Long petId) {
		return emitters.get(petId); // 단일 Emitter 반환
	}

	@Override
	public void deleteByPetId(Long petId) {
		emitters.remove(petId);
		log.info("Deleted SSE emitter for petId: {}", petId);
	}
}
