package com.everstarbackmain.domain.sse;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SseService {

	private static final Long TIMEOUT_SEC = 10L;
	private final EmitterRepositoryImpl emitterRepository;
	private final PetRepository petRepository;

	// 지구별 접속시 SSE pet과 연결
	public SseEmitter connect(User user, Long id, String lastEventId) {
		Pet pet = petRepository.findByUserAndIdAndIsDeleted(user, id,false).orElseThrow(() -> new ExceptionResponse(
			CustomException.NOT_FOUND_PET_EXCEPTION));
		Long petId = pet.getId();

		SseEmitter emitter = createEmitter(petId, lastEventId);
		sendToClient(petId, "EventStream Created. [petId=" + petId + "]");
		return emitter;
	}

	// petId 기반으로 Emitter 생성
	private SseEmitter createEmitter(Long petId, String lastEventId) {
		SseEmitter emitter = new SseEmitter(TIMEOUT_SEC);
		emitterRepository.save(petId, emitter);

		emitter.onCompletion(() -> emitterRepository.deleteByPetId(petId)); // 네트워크 오류
		emitter.onTimeout(() -> emitterRepository.deleteByPetId(petId)); // 시간 초과
		emitter.onError((e) -> emitterRepository.deleteByPetId(petId)); // 오류

		return emitter;
	}

	private void sendToClient(Long petId, Object data) {
		SseEmitter emitter = emitterRepository.findEmitterByPetId(petId);
		if (emitter != null) {
			try {
				emitter.send(SseEmitter.event().id(String.valueOf(petId)).name("sse").data(data));
			} catch (IOException e) {
				emitterRepository.deleteByPetId(petId);
				emitter.completeWithError(e);
			}
		}
	}
}
