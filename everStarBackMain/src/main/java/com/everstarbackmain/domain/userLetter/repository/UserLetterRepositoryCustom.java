package com.everstarbackmain.domain.userLetter.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.everstarbackmain.domain.userLetter.model.UserLetter;

public interface UserLetterRepositoryCustom {

	List<UserLetter> getUserLettersWithTimeRange(LocalDateTime startTime, LocalDateTime lastTime);
}
