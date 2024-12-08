package com.example.elearningapi.entity;

import com.example.elearningapi.enums.QuestionType;
import jakarta.persistence.Id;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Data
@Document(collection = "question")
public class Question {
    @Id
    private String id;

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
    @Valid
    private List<QuestionOption> options;

    @NotEmpty
    private List<String> correctAnswers;

    private String explanation;

    private Map<String, Object> metadata;

    private List<Media> media;

}
