package com.everstarbackmain.domain.questAnswer.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class QuestAnswerId implements Serializable {

	private Long petId;
	private Long questId;

}
