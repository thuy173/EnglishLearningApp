package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.auth.LoginRequest;
import com.example.elearningapi.beans.request.auth.SignUpRequest;
import com.example.elearningapi.beans.request.auth.SignUpUserRequest;
import com.example.elearningapi.beans.response.AuthResponse;
import com.example.elearningapi.entity.User;
import com.example.elearningapi.exception.ConflictException;
import com.example.elearningapi.exception.ResourceNotFoundException;
import com.example.elearningapi.mapper.AuthMapper;
import com.example.elearningapi.repository.UserRepository;
import com.example.elearningapi.service.AuthService;
import com.example.elearningapi.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final AuthMapper authMapper;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;

    @Override
    public void signUp(SignUpRequest signUpRequest) {

        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent())
            throw new ConflictException("Email already exists");

        User user = new User();
        authMapper.convertToRequest(user, signUpRequest);
        userRepository.save(user);
    }

    @Override
    public void signUpUser(SignUpUserRequest signUpRequest) {
        if(userRepository.findByEmail(signUpRequest.getEmail()).isPresent())
            throw new ConflictException("Email already exists");

        User user = new User();
        authMapper.convertToSignUserRequest(user, signUpRequest);
        userRepository.save(user);
    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        return authenticateAndGenerateTokens(loginRequest, "ROLE_USER");
    }

    @Override
    public AuthResponse loginAdmin(LoginRequest loginRequest) {
        return authenticateAndGenerateTokens(loginRequest, "ROLE_ADMIN");
    }
    private AuthResponse authenticateAndGenerateTokens(LoginRequest loginRequest, String requiredRole) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Username not found"));

        if (!user.getRole().getName().equals(requiredRole)) {
            throw new SecurityException("User does not have the required role: " + requiredRole);
        }

        String accessToken = jwtUtils.generateAccessToken(user);
        String refreshToken = jwtUtils.generateRefreshToken(user);

        return new AuthResponse(accessToken, refreshToken, "User login successfully");
    }

    @Override
    public void logout() {
        SecurityContextHolder.clearContext();
    }
}
