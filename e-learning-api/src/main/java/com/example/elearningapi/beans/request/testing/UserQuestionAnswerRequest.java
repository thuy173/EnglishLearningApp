package com.example.elearningapi.beans.request.testing;

import lombok.Data;

import java.util.List;

@Data
public class UserQuestionAnswerRequest {
    private String questionId;
    private List<String> selectedOptions;
    private Long timeSpent;
}
