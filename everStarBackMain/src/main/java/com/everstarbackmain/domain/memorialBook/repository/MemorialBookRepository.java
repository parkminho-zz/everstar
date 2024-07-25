package com.everstarbackmain.domain.memorialBook.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.everstarbackmain.domain.memorialBook.model.MemorialBook;

public interface MemorialBookRepository extends JpaRepository<MemorialBook, Long> {

	Optional<MemorialBook> findById(Long id);
	Optional<MemorialBook> findByPetId(Long petId);
}
