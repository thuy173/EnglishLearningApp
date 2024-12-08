package com.example.elearningapi.service;

import com.example.elearningapi.configuration.OpenAIConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

@Service
public class OpenAIService {

    @Autowired
    private OpenAIConfig openAIConfig;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getChatGPTResponse(String userMessage) {
        String apiUrl = openAIConfig.getApiUrl();
        String apiKey = openAIConfig.getApiKey();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        Map<String, Object> requestBody = Map.of(
                "model", "gpt-3.5-turbo",
                "messages", List.of(Map.of("role", "user", "content", userMessage))
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, String.class);

        try {
            JsonNode jsonResponse = new ObjectMapper().readTree(response.getBody());
            return jsonResponse.get("choices").get(0).get("message").get("content").asText();
        } catch (Exception e) {
            e.printStackTrace();
            return "Lỗi khi xử lý phản hồi từ API OpenAI.";
        }
    }
}
