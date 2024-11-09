package com.example.elearningapi.beans.request.testing;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class QuizRequest {
    @NotBlank
    private String title;

    private String description;
    private Long lessonId;
    private Integer timeLimit;
    private Integer passingScore;
    private List<QuestionRequest> questions;
}
