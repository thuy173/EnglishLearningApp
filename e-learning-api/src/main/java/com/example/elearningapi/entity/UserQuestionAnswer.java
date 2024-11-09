package com.example.elearningapi.entity;

import lombok.Data;

import java.util.List;

@Data
public class UserQuestionAnswer {

    private String questionId;

    private List<String> selectedOptions;

    private Boolean isCorrect;

    private Integer points;

    private Long timeSpent;
}
