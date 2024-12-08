package com.example.elearningapi.beans.response.testing;

import lombok.Data;

@Data
public class QuizShortResponse {
    private String id;
    private String title;
    private String description;
    private Integer timeLimit;
    private Integer totalQuestions;
}
