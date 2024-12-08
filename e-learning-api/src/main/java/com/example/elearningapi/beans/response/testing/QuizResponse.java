package com.example.elearningapi.beans.response.testing;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class QuizResponse {
    private String id;
    private String title;
    private String description;
    private Integer levelId;
    private Long lessonId;
    private Integer timeLimit;
    private Integer passingScore;
    private List<QuestionResponse> questions;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
