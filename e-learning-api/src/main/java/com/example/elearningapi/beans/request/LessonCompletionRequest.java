package com.example.elearningapi.beans.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class LessonCompletionRequest {
    @NotNull
    private Long userId;

    private Integer score;

    @Min(0)
    private Integer timeSpent;

    private String notes;

    private List<Long> completedVocabularyIds;
}
