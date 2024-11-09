package com.example.elearningapi.controller.admin;

import com.example.elearningapi.beans.request.auth.LoginRequest;
import com.example.elearningapi.beans.request.auth.SignUpRequest;
import com.example.elearningapi.beans.response.AuthResponse;
import com.example.elearningapi.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}

