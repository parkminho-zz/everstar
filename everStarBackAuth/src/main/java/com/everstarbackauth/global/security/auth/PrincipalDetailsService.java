package com.everstarbackauth.global.security.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eternitystar.domain.user.model.User;
import com.eternitystar.domain.user.repository.UserRepository;
import com.eternitystar.global.exception.CustomException;
import com.eternitystar.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findUserByEmail(email).orElseThrow(() ->
                new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION)
        );
        return new PrincipalDetails(user);
    }
}
