package com.example.elearningapi.entity;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class QuestionOption {
    @Id
    private String id;

    @NotBlank
    private String content;

    private Media media;

}
