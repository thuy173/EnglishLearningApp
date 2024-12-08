package com.example.elearningapi.service.impl;

import com.example.elearningapi.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender emailSender;
    private final SpringTemplateEngine templateEngine;

    @Value("${spring.mail.from-name}")
    private String fromEmail;

    @Override
    public void sendHtmlEmail(String to, String subject, String templateName, Map<String, Object> variables) {
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            Context context = new Context();
            context.setVariables(variables);

            String htmlBody = templateEngine.process(templateName, context);

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);

            emailSender.send(mimeMessage);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send HTML email", e);
        }
    }
}
