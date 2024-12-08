package com.example.elearningapi.beans.response.testing;

import com.example.elearningapi.entity.QuestionOption;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuestionResultResponse {
    private String questionId;
    private String prompt;
    private String content;
    private List<QuestionOption> options;
    private List<String> selectedOptions;
    private List<String> correctAnswers;
    private Boolean isCorrect;
    private Integer points;
    private Integer earnedPoints;
    private Long timeSpent;
    private String explanation;
}
