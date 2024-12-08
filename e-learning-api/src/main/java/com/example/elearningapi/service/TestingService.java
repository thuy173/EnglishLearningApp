package com.example.elearningapi.service;

import com.example.elearningapi.beans.request.testing.QuizAttemptRequest;
import com.example.elearningapi.beans.request.testing.QuizRequest;
import com.example.elearningapi.beans.response.testing.*;
import com.example.elearningapi.entity.UserQuizAttempt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public interface TestingService {
    QuizResponse createQuiz(QuizRequest request);
    void updateQuiz(String id, QuizRequest request);
    Page<QuizResponse> getAllQuizzes(String name, Long lessonId,  int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection);
    void deleteOne(String id);
    void deleteMultiple(List<String> ids);

    Page<QuizShortResponse> getAllData(String title, Long levelId, Long lessonId, int pageNumber,
                                       int pageSize, String sortField, Sort.Direction sortDirection);

    QuizResponse getQuiz(String id);

    QuizAttemptResponse startQuizAttempt(String quizId);

    UserQuizAttempt submitQuizAttempt(QuizAttemptRequest request);

    QuizResultResponse getQuizResult(String attemptId);

    Page<UserQuizAttemptResponse> getUserQuizAttempts(String quizTitle, Boolean passed,
                                                      LocalDate startedAt, LocalDate completedAt,
                                                      int pageNumber, int pageSize, String sortField,
                                                      Sort.Direction sortDirection);
}
