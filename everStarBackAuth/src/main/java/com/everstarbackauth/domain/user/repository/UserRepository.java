package com.everstarbackauth.domain.user.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.everstarbackauth.domain.user.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{

	Optional<User> findUserByEmail(String email);
}
