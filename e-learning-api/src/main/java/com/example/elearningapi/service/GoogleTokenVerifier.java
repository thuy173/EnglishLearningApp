package com.example.elearningapi.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class GoogleTokenVerifier {
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String CLIENT_ID;

    private GoogleIdTokenVerifier verifier;

    @PostConstruct
    public void init() {
        verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();
    }

    public GoogleIdToken verify(String idTokenString) throws Exception {
        if (verifier == null) {
            throw new IllegalStateException("Google Token Verifier not initialized");
        }
        return verifier.verify(idTokenString);
    }
}