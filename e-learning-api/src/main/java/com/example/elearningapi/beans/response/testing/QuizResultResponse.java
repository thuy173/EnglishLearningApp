package com.example.elearningapi.beans.response.testing;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class QuizResultResponse {
    private String quizId;
    private Double score;
    private Boolean passed;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private Double totalTimeSpent;
    private List<QuestionResultResponse> questionResults;
    private Map<String, Object> statistics;
}
