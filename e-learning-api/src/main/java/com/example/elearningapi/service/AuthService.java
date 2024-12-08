package com.example.elearningapi.service;

import com.example.elearningapi.beans.request.auth.*;
import com.example.elearningapi.beans.response.AuthResponse;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    void signUp(SignUpRequest signUpRequest);

    void signUpUser(SignUpUserRequest signUpRequest);

    AuthResponse login(LoginRequest loginRequest);

    AuthResponse loginAdmin(LoginRequest loginRequest);

    void logout();

    String forgotPassword(ForgotPasswordRequest forgotPasswordRequest, String source);

    void resetPassword(ResetPasswordRequest resetPasswordRequest);
}
