package com.example.elearningapi.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class UserQuestionAnswer {

    private String questionId;

    private List<String> selectedOptions;

    private Boolean isCorrect;

    private Integer points;

    private Long timeSpent;
}
