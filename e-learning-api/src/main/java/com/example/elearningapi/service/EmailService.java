package com.example.elearningapi.service;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface EmailService {
    void sendHtmlEmail(String to, String subject, String templateName, Map<String, Object> variables);
}
