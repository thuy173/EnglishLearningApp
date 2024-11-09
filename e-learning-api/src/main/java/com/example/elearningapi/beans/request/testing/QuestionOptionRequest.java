package com.example.elearningapi.beans.request.testing;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class QuestionOptionRequest {
    @NotBlank
    private String content;
    private MediaRequest media;
}
