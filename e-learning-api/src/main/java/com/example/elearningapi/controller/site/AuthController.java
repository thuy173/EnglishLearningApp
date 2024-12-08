package com.example.elearningapi.controller.site;

import com.example.elearningapi.beans.request.auth.*;
import com.example.elearningapi.beans.response.AuthResponse;
import com.example.elearningapi.entity.User;
import com.example.elearningapi.repository.UserRepository;
import com.example.elearningapi.service.AuthService;
import com.example.elearningapi.service.GoogleTokenVerifier;
import com.example.elearningapi.utils.JwtUtils;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final GoogleTokenVerifier googleTokenVerifier;

    @Value("${jwt.access-token.expiration}")
    private Long ACCESS_TOKEN_EXPIRATION;

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signUp(@RequestBody SignUpUserRequest registerRequest){
        authService.signUpUser(registerRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> logout() {
        authService.logout();
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping(value = "/google-login")
    public ResponseEntity<Map<String, String>> googleLogin(@RequestBody GoogleLoginRequest googleLoginRequest, HttpServletRequest request){
        try {
            GoogleIdToken.Payload payload = googleTokenVerifier.verify(googleLoginRequest.getGoogleToken()).getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String usernameWithAt = email.substring(0, email.indexOf('@') + 1);
            String pass = usernameWithAt.substring(0, 1).toUpperCase() + usernameWithAt.substring(1);
            
            Optional<User> user = userRepository.findByEmail(email);

            if(!user.isPresent()){
                SignUpUserRequest registerRequest = new SignUpUserRequest();
                registerRequest.setEmail(email);
                registerRequest.setFullName(name);
                registerRequest.setPassword(pass);
                authService.signUpUser(registerRequest);
            }

            User userLoad = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Email not found"));

            final String jwt = jwtUtils.generateToken(userLoad, ACCESS_TOKEN_EXPIRATION);

            Map<String, String> response = new HashMap<>();
            response.put("accessToken", jwt);
            response.put("refreshToken", jwt);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("Error during Google login:");
            e.printStackTrace();

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Google login failed: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @RequestBody ForgotPasswordRequest forgotPasswordRequest
    ){
        String source = "site";
        String callbackUrl = authService.forgotPassword(forgotPasswordRequest, source);
        return ResponseEntity.ok().body(callbackUrl);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest){
        authService.resetPassword(resetPasswordRequest);
        return ResponseEntity.ok().build();
    }
}
