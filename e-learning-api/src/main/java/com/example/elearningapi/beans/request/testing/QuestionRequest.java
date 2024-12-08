package com.example.elearningapi.beans.request.testing;

import com.example.elearningapi.enums.QuestionType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class QuestionRequest {
    @NotBlank
    private String prompt;

    @NotBlank
    private String content;

    @NotNull
    private QuestionType type;

    @NotNull
    @Min(0)
    private Integer points;

    @NotEmpty
    private List<QuestionOptionRequest> options;

    @NotEmpty
    private List<String> correctAnswers;

    private String explanation;

    private List<MediaRequest> media;
}
