package com.everstarbackmain.domain.notification.util;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Component;

import com.everstarbackmain.domain.notification.model.Notification;
import com.everstarbackmain.domain.notification.repository.NotificationRepository;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationUtil {

	private final NotificationRepository notificationRepository;

	public void sendPetLetterNotification(UserLetter userLetter) {
		Pet pet = userLetter.getPet();
		User user = pet.getUser();

		List<Notification> notifications = notificationRepository.findByUser(user);
		sendNotification(notifications, pet);
	}

	private void sendNotification(List<Notification> notifications, Pet pet) {
		for (Notification notification : notifications) {
			Message message = Message.builder()
				.setWebpushConfig(WebpushConfig.builder()
					.setNotification(WebpushNotification.builder()
						.setTitle(pet.getName() + "에게 편지가 왔어요")
						.build())
					.build())
				.setToken(notification.getDeviceToken())
				.build();

			try {
				FirebaseMessaging.getInstance().sendAsync(message).get();
			} catch (Exception e) {
				log.error("main server - request : {}", e.getMessage());
				new ExceptionResponse(CustomException.NOT_FOUND_NOTIFICATION_EXCEPTION);
			}
		}
	}
}
