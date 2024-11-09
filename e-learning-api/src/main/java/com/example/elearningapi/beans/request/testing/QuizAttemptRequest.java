package com.example.elearningapi.beans.request.testing;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class QuizAttemptRequest {
    @NotNull
    private String quizId;

    @NotEmpty
    private List<UserQuestionAnswerRequest> answers;
}
