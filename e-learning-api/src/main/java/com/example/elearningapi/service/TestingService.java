package com.example.elearningapi.service;

import com.example.elearningapi.beans.request.testing.QuizAttemptRequest;
import com.example.elearningapi.beans.request.testing.QuizRequest;
import com.example.elearningapi.beans.response.testing.QuizResponse;
import com.example.elearningapi.entity.UserQuizAttempt;
import org.springframework.stereotype.Service;

@Service
public interface TestingService {
    QuizResponse createQuiz(QuizRequest request);

    QuizResponse getQuiz(String id);

    UserQuizAttempt startQuizAttempt(Long userId, String quizId);

    UserQuizAttempt submitQuizAttempt(Long userId, QuizAttemptRequest request);
}
