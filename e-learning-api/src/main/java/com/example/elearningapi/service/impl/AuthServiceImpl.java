package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.auth.*;
import com.example.elearningapi.beans.response.AuthResponse;
import com.example.elearningapi.entity.PasswordResetToken;
import com.example.elearningapi.entity.User;
import com.example.elearningapi.exception.BadRequestException;
import com.example.elearningapi.exception.ConflictException;
import com.example.elearningapi.exception.ResourceNotFoundException;
import com.example.elearningapi.mapper.AuthMapper;
import com.example.elearningapi.repository.PasswordResetTokenRepository;
import com.example.elearningapi.repository.UserRepository;
import com.example.elearningapi.service.AuthService;
import com.example.elearningapi.service.EmailService;
import com.example.elearningapi.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final AuthMapper authMapper;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;

    @Value("${jwt.reset-password-token.exp_min}")
    private Long RESET_PASSWORD_TOKEN_EXPIRATION;

    @Value("${frontend.site.url}")
    private String FRONTEND_SITE;

    @Value("${frontend.admin.url}")
    private String FRONTEND_ADMIN;

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
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent())
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

    @Override
    public String forgotPassword(ForgotPasswordRequest forgotPasswordRequest, String source) {
        User user = userRepository.findByEmail(forgotPasswordRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String resetToken = jwtUtils.generateAccessToken(user);
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setUser(user);
        passwordResetToken.setToken(resetToken);
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusMinutes(RESET_PASSWORD_TOKEN_EXPIRATION));
        passwordResetTokenRepository.save(passwordResetToken);

        String baseUrl = determineBaseUrl(source);
        String callbackUrl = genResetPasswordToken(baseUrl, user, resetToken);

        Map<String, Object> variables = new HashMap<>();
        variables.put("resetUrl", callbackUrl);

        emailService.sendHtmlEmail(
                user.getEmail(),
                "Reset Password",
                "reset-password",
                variables
        );

        return callbackUrl;
    }

    @Override
    public void resetPassword(ResetPasswordRequest resetPasswordRequest) {
        User user = userRepository.findByEmail(resetPasswordRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        String resetToken = resetPasswordRequest.getToken();
        PasswordResetToken passResetToken = passwordResetTokenRepository.findByTokenAndUserEmail(resetToken, user.getEmail());
        if (passResetToken == null) {
            throw new BadRequestException("Invalid token");
        }
        user.setPassword(resetPasswordRequest.getNewPassword());
        userRepository.save(user);
    }

    private String determineBaseUrl(String origin) {
        if ("admin".equalsIgnoreCase(origin)) {
            return FRONTEND_ADMIN;
        }
        return FRONTEND_SITE;
    }

    private String genResetPasswordToken(String baseUrl, User user, String resetToken) {
        return baseUrl + "/reset-password?userId=" + user.getEmail() + "&token=" + resetToken;
    }
}
