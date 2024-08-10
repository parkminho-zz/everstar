package com.everstarbackmain.domain.sse;

import java.io.IOException;

import org.springframework.http.MediaType;
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

	private static final Long TIMEOUT_SEC = 60L * 1000 * 60;
	private final EmitterRepositoryImpl emitterRepository;
	private final PetRepository petRepository;

	public SseEmitter connect(User user, Long id) {
		Pet pet = petRepository.findByUserAndIdAndIsDeleted(user, id, false).
			orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		SseEmitter emitter = createEmitter(pet.getId());
		sendToClient(pet, emitter);
		return emitter;
	}

	private SseEmitter createEmitter(Long petId) {
		SseEmitter emitter = new SseEmitter(TIMEOUT_SEC);
		emitterRepository.save(petId, emitter);

		emitter.onCompletion(() -> emitterRepository.deleteByPetId(petId)); // 네트워크 오류
		emitter.onTimeout(() -> emitterRepository.deleteByPetId(petId)); // 시간 초과
		emitter.onError(e -> emitterRepository.deleteByPetId(petId)); // 오류

		return emitter;
	}

	public void sendToClient(Pet pet, SseEmitter emitter) {
		if (emitter != null) {
			try {
				String data = generateDataMessage(pet);
				emitter.send(SseEmitter.event()
					.id(String.valueOf(pet.getId()))
					.data(data, MediaType.APPLICATION_JSON));
			} catch (IOException e) {
				emitterRepository.deleteByPetId(pet.getId());
				emitter.completeWithError(e);
			}
		}
	}

	private String generateDataMessage(Pet pet) {
		if (pet.getQuestIndex() == 50) {
			return "영원별에 메모리얼북이 완성 됐어요.";
		} else if (pet.getIsQuestCompleted()) {
			return "퀘스트를 완료했어요.";
		} else {
			return pet.getQuestIndex().toString();
		}
	}
}