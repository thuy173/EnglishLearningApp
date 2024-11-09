package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.testing.QuizAttemptRequest;
import com.example.elearningapi.beans.request.testing.QuizRequest;
import com.example.elearningapi.beans.request.testing.UserQuestionAnswerRequest;
import com.example.elearningapi.beans.response.testing.QuizResponse;
import com.example.elearningapi.entity.Question;
import com.example.elearningapi.entity.Quiz;
import com.example.elearningapi.entity.UserQuestionAnswer;
import com.example.elearningapi.entity.UserQuizAttempt;
import com.example.elearningapi.exception.ResourceNotFoundException;
import com.example.elearningapi.mapper.TestingMapper;
import com.example.elearningapi.repository.QuestionRepository;
import com.example.elearningapi.repository.QuizRepository;
import com.example.elearningapi.repository.UserQuizAttemptRepository;
import com.example.elearningapi.service.TestingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TestingServiceImpl implements TestingService {
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final UserQuizAttemptRepository userQuizAttemptRepository;
    private final TestingMapper testingMapper;

    @Override
    public QuizResponse createQuiz(QuizRequest request) {
        Quiz quiz = testingMapper.toQuizEntity(request);
        Quiz savedQuiz = quizRepository.save(quiz);
        return testingMapper.toQuizResponse(savedQuiz);
    }

    @Override
    public QuizResponse getQuiz(String id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        return testingMapper.toQuizResponse(quiz);
    }

    @Override
    public UserQuizAttempt startQuizAttempt(Long userId, String quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        userQuizAttemptRepository.findByUserIdAndQuizIdAndCompletedAtIsNull(userId, quizId)
                .ifPresent(attempt ->{
                    throw new IllegalStateException("User has an ongoing quiz attempt");
                });

        UserQuizAttempt attempt = new UserQuizAttempt();
        attempt.setUserId(userId);
        attempt.setQuizId(quizId);
        attempt.setStartedAt(LocalDateTime.now());

        return userQuizAttemptRepository.save(attempt);
    }

    @Override
    public UserQuizAttempt submitQuizAttempt(Long userId, QuizAttemptRequest request) {
        UserQuizAttempt attempt = userQuizAttemptRepository
                .findByUserIdAndQuizIdAndCompletedAtIsNull(userId, request.getQuizId())
                .orElseThrow(() -> new ResourceNotFoundException("No active quiz attempt found"));

        Quiz quiz = quizRepository.findById(request.getQuizId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found"));

        List<UserQuestionAnswer> answers = evaluateAnswers(request.getAnswers(), quiz.getQuestions());
        double totalScore = calculateTotalScore(answers);
        boolean passed =  isPassed(totalScore, quiz.getPassingScore());

        attempt.setAnswers(answers);
        attempt.setScore(totalScore);
        attempt.setPassed(passed);
        attempt.setCompletedAt(LocalDateTime.now());

        return userQuizAttemptRepository.save(attempt);
    }

    private List<UserQuestionAnswer> evaluateAnswers(List<UserQuestionAnswerRequest> userAnswers,
                                                     List<Question> questions){
        Map<String, Question> questionMap = questions.stream()
                .collect(Collectors.toMap(Question::getId, q -> q));

        return userAnswers.stream().map(userAnswer ->{
            Question question  = questionMap.get(userAnswer.getQuestionId());
            boolean isCorrect = evaluatedAnswer(userAnswer.getSelectedOptions(), question.getCorrectAnswers());

            UserQuestionAnswer answer = new UserQuestionAnswer();
            answer.setQuestionId(userAnswer.getQuestionId());
            answer.setSelectedOptions(userAnswer.getSelectedOptions());
            answer.setIsCorrect(isCorrect);
            answer.setPoints(isCorrect ? question.getPoints() : 0);
            answer.setTimeSpent(userAnswer.getTimeSpent());

            return answer;
        }).collect(Collectors.toList());
    }

    private boolean evaluatedAnswer(List<String> selectedOptions, List<String> correctAnswers){
        if(selectedOptions == null || correctAnswers == null){
            return false;
        }
        return new HashSet<>(selectedOptions).equals(new HashSet<>(correctAnswers));
    }

    private double calculateTotalScore(List<UserQuestionAnswer> answers){
        return answers.stream()
                .mapToInt(UserQuestionAnswer::getPoints)
                .sum();
    }

    private boolean isPassed(double totalScore, Integer passingScore){
        return totalScore >= passingScore;
    }
}
