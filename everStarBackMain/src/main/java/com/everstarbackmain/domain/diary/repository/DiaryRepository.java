package com.everstarbackmain.domain.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.everstarbackmain.domain.diary.model.Diary;

public interface DiaryRepository extends JpaRepository<Diary, Integer> {
}
