package com.example.elearningapi.entity;

import jakarta.persistence.Id;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "user_quiz_attempts")
public class UserQuizAttempt {
    @Id
    private String id;

    @NotNull
    private Long userId;

    @NotNull
    private String quizId;

    @NotNull
    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

    @Min(0)
    private Double score;

    private Boolean passed;

    @Valid
    private List<UserQuestionAnswer> answers;

    private Map<String, Long> questionTimeSpent;

    private Map<String, Object> metadata;

}
