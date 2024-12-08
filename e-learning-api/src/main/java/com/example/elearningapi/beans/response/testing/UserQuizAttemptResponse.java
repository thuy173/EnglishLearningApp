package com.example.elearningapi.beans.response.testing;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserQuizAttemptResponse {
    private String attemptId;
    private String quizId;
    private String quizTitle;
    private Double score;
    private Boolean passed;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
}
