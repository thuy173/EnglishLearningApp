package com.example.elearningapi.entity;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class QuestionOption {
    @Id
    private String id;

    @NotBlank
    private String content;

    private Media media;

}
