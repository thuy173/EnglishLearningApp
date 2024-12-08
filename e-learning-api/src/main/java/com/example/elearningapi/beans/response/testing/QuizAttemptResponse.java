package com.example.elearningapi.beans.response.testing;

import com.example.elearningapi.entity.UserQuizAttempt;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuizAttemptResponse {
    private String status;
    private String message;
    private String redirectUrl;
    private UserQuizAttempt attempt;
}
