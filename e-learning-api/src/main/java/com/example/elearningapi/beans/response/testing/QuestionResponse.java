package com.example.elearningapi.beans.response.testing;

import com.example.elearningapi.enums.QuestionType;
import lombok.Data;

import java.util.List;

@Data
public class QuestionResponse {
    private String id;
    private String prompt;
    private String content;
    private QuestionType type;
    private Integer points;
    private List<QuestionOptionResponse> options;
    private String explanation;
    private List<MediaResponse> media;
}
