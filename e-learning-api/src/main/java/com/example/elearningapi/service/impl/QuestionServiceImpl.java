package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.testing.QuestionRequest;
import com.example.elearningapi.beans.response.testing.QuestionResponse;
import com.example.elearningapi.entity.Category;
import com.example.elearningapi.entity.Question;
import com.example.elearningapi.exception.EmptyException;
import com.example.elearningapi.mapper.TestingMapper;
import com.example.elearningapi.repository.QuestionRepository;
import com.example.elearningapi.repository.QuizRepository;
import com.example.elearningapi.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;
    private final TestingMapper testingMapper;

    @Override
    public QuestionResponse createQuestion(QuestionRequest questionRequest) {
        Question question = testingMapper.toQuestionEntity(questionRequest);
        Question saveQuestion = questionRepository.save(question);
        return testingMapper.toQuestionResponse(saveQuestion);
    }

    @Override
    public Page<QuestionResponse> getAllQuestions(Pageable pageable) {
        return null;
    }

    @Override
    public QuestionResponse getQuestionById(String questionId) {
        return null;
    }

    @Override
    public QuestionResponse updateQuestion(String questionId, QuestionRequest questionRequest) {
        return null;
    }

    @Override
    public void deleteOne(String id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Question not found with id " + id));

        questionRepository.delete(question);
    }

    @Override
    public void deleteMultiple(List<String> ids) {
        List<Question> questions = questionRepository.findAllById(ids);

        if (questions.isEmpty()) {
            throw new EmptyException("No questions found with the given ids");
        }

        questionRepository.deleteAll(questions);
    }
}
