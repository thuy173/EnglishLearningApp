package com.example.elearningapi.service;

import com.example.elearningapi.beans.request.testing.QuestionRequest;
import com.example.elearningapi.beans.response.testing.QuestionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuestionService {
    QuestionResponse createQuestion(QuestionRequest questionRequest);

    Page<QuestionResponse> getAllQuestions(Pageable pageable);

    QuestionResponse getQuestionById(String questionId);

    QuestionResponse updateQuestion(String questionId, QuestionRequest questionRequest);

    void deleteOne(String questionId);

    void deleteMultiple(List<String> ids);
}
