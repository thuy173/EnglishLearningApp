package com.example.elearningapi.controller.admin;

import com.example.elearningapi.beans.request.auth.ForgotPasswordRequest;
import com.example.elearningapi.beans.request.auth.LoginRequest;
import com.example.elearningapi.beans.request.auth.ResetPasswordRequest;
import com.example.elearningapi.beans.request.auth.SignUpRequest;
import com.example.elearningapi.beans.response.AuthResponse;
import com.example.elearningapi.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/auth")
@RequiredArgsConstructor
public class AdminAuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(authService.loginAdmin(loginRequest));
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signUp(@Valid @RequestBody SignUpRequest registerRequest){
        authService.signUp(registerRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> logout() {
        authService.logout();
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @RequestBody ForgotPasswordRequest forgotPasswordRequest
    ){
        String source = "admin";
        String callbackUrl = authService.forgotPassword(forgotPasswordRequest, source);
        return ResponseEntity.ok().body(callbackUrl);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest){
        authService.resetPassword(resetPasswordRequest);
        return ResponseEntity.ok().build();
    }
}

