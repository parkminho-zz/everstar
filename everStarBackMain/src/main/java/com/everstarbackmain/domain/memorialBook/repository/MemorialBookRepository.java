package com.everstarbackmain.domain.memorialBook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.everstarbackmain.domain.memorialBook.model.MemorialBook;

public interface MemorialBookRepository extends JpaRepository<MemorialBook, Long> {
}
