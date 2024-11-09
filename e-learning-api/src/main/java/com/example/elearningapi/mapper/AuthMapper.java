package com.example.elearningapi.mapper;

import com.example.elearningapi.beans.request.auth.SignUpRequest;
import com.example.elearningapi.beans.request.auth.SignUpUserRequest;
import com.example.elearningapi.entity.Role;
import com.example.elearningapi.entity.User;
import com.example.elearningapi.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class AuthMapper {
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public void convertToRequest(User user, SignUpRequest signUpRequest){
        user.setFullName(signUpRequest.getFullName());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setEmail(signUpRequest.getEmail());
        user.setStatus(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        Role userRole = roleRepository.findById(signUpRequest.getRoleId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid role id"));

        user.setRole(userRole);

    }

    public void convertToSignUserRequest(User user, SignUpUserRequest signUpRequest){
        user.setFullName(signUpRequest.getFullName());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setEmail(signUpRequest.getEmail());
        user.setStatus(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        Role userRole = roleRepository.findByName("ROLE_USER");

        if(userRole == null){
            userRole = new Role();
            userRole.setName("ROLE_USER");
            userRole = roleRepository.save(userRole);
        }
        user.setRole(userRole);

    }
}
