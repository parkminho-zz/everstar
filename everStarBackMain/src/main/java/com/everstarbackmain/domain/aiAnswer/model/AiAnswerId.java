package com.everstarbackmain.domain.aiAnswer.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class AiAnswerId implements Serializable {

	private Long petId;
	private Long questId;

}
