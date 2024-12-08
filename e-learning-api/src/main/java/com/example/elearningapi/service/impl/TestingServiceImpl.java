package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.testing.QuizAttemptRequest;
import com.example.elearningapi.beans.request.testing.QuizRequest;
import com.example.elearningapi.beans.request.testing.UserQuestionAnswerRequest;
import com.example.elearningapi.beans.response.testing.*;
import com.example.elearningapi.entity.*;
import com.example.elearningapi.exception.ResourceNotFoundException;
import com.example.elearningapi.exception.UnauthorizedException;
import com.example.elearningapi.mapper.TestingMapper;
import com.example.elearningapi.repository.QuestionRepository;
import com.example.elearningapi.repository.QuizRepository;
import com.example.elearningapi.repository.UserQuizAttemptRepository;
import com.example.elearningapi.service.TestingService;
import com.example.elearningapi.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TestingServiceImpl implements TestingService {
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final UserQuizAttemptRepository userQuizAttemptRepository;
    private final TestingMapper testingMapper;
    private final SecurityUtils securityUtils;
    private final MongoTemplate mongoTemplate;

    @Override
    public QuizResponse createQuiz(QuizRequest request) {
        Quiz quiz = testingMapper.toQuizEntity(request);

        List<Question> savedQuestions = questionRepository.saveAll(quiz.getQuestions());
        quiz.setQuestions(savedQuestions);
        quiz.setIsArchived(false);

        Quiz savedQuiz = quizRepository.save(quiz);
        return testingMapper.toQuizResponse(savedQuiz);
    }

    @Override
    public void updateQuiz(String id, QuizRequest request) {
        Quiz existingQuiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + id));

        existingQuiz.setTitle(request.getTitle());
        existingQuiz.setDescription(request.getDescription());
        existingQuiz.setLessonId(request.getLessonId());
        existingQuiz.setTimeLimit(request.getTimeLimit());
        existingQuiz.setPassingScore(request.getPassingScore());

        if (request.getQuestions() != null) {
            questionRepository.deleteAll(existingQuiz.getQuestions());

            List<Question> newQuestions = request.getQuestions().stream()
                    .map(testingMapper::toQuestionEntity)
                    .collect(Collectors.toList());

            List<Question> savedQuestions = questionRepository.saveAll(newQuestions);
            existingQuiz.setQuestions(savedQuestions);
        }

        quizRepository.save(existingQuiz);
    }

    @Override
    public Page<QuizResponse> getAllQuizzes(String name, Long lessonId, int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection) {
        Query query = new Query();

        // Add filters
        Criteria criteria = new Criteria();
        List<Criteria> criteriaList = new ArrayList<>();

        if (name != null && !name.trim().isEmpty()) {
            criteriaList.add(Criteria.where("title").regex(name, "i")); // Case-insensitive search
        }

        if (lessonId != null) {
            criteriaList.add(Criteria.where("lessonId").is(lessonId));
        }

        if (!criteriaList.isEmpty()) {
            criteriaList.add(Criteria.where("isArchived").is(false));
            criteria = new Criteria().andOperator(criteriaList.toArray(new Criteria[0]));
            query.addCriteria(criteria);
        } else {
            query.addCriteria(Criteria.where("isArchived").is(false));
        }

        // Add sorting
        if (sortField != null && !sortField.isEmpty()) {
            Sort sort = Sort.by(sortDirection, sortField);
            query.with(sort);
        } else {
            // Default sort by creation date if no sort field specified
            query.with(Sort.by(Sort.Direction.DESC, "createdAt"));
        }

        // Add pagination
        final Pageable pageable = PageRequest.of(pageNumber, pageSize);
        query.with(pageable);

        // Execute count query
        long total = mongoTemplate.count(query, Quiz.class);

        // Execute find query
        List<Quiz> quizzes = mongoTemplate.find(query, Quiz.class);

        // Map to response DTOs
        List<QuizResponse> quizResponses = quizzes.stream()
                .map(testingMapper::toQuizResponse)
                .collect(Collectors.toList());

        // Create page object
        return new PageImpl<>(quizResponses, pageable, total);
    }

    @Override
    public void deleteOne(String id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + id));

        quiz.setIsArchived(true);
        quizRepository.save(quiz);
    }

    @Override
    public void deleteMultiple(List<String> ids) {
        if (ids == null || ids.isEmpty()) {
            throw new IllegalArgumentException("No quiz ids provided for deletion");
        }

        List<Quiz> quizzes = quizRepository.findAllById(ids);

        if (quizzes.isEmpty()) {
            throw new ResourceNotFoundException("No quizzes found with the provided ids");
        }

        quizzes.forEach(quiz -> quiz.setIsArchived(true));
        quizRepository.saveAll(quizzes);
    }

    @Override
    public Page<QuizShortResponse> getAllData(String title, Long levelId, Long lessonId, int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortDirection, sortField));

        Query query = new Query().with(pageable);

        if (lessonId != null) {
            query.addCriteria(Criteria.where("lessonId").is(lessonId));
        }

        if (levelId != null) {
            query.addCriteria(Criteria.where("levelId").is(levelId));
        }

        if (title != null && !title.trim().isEmpty()) {
            query.addCriteria(Criteria.where("title").regex(".*" + title.toLowerCase() + ".*", "i"));
        }

        query.addCriteria(Criteria.where("isArchived").is(false));

        List<Quiz> quizzes = mongoTemplate.find(query, Quiz.class);
        long count = mongoTemplate.count(query.skip(-1).limit(-1), Quiz.class);

        // Map the results to QuizShortResponse
        List<QuizShortResponse> responses = quizzes.stream()
                .map(testingMapper::toQuizShortResponse)
                .toList();

        return new PageImpl<>(responses, pageable, count);
    }

    @Override
    public QuizResponse getQuiz(String id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        if (Boolean.TRUE.equals(quiz.getIsArchived())) {
            throw new ResourceNotFoundException("Quiz not found or is archived");
        }
        return testingMapper.toQuizResponse(quiz);
    }

    @Override
    public QuizAttemptResponse startQuizAttempt(String quizId) {
        Long currentUserId = securityUtils.getCurrentUserId();

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        try {
            Optional<UserQuizAttempt> existingAttempt =
                    userQuizAttemptRepository.findByUserIdAndQuizIdAndCompletedAtIsNull(currentUserId, quizId);

            if (existingAttempt.isPresent()) {
                return QuizAttemptResponse.builder()
                        .status("ONGOING_ATTEMPT")
                        .message("You have an ongoing quiz attempt")
                        .redirectUrl("/quiz/" + existingAttempt.get().getId())
                        .attempt(existingAttempt.get())
                        .build();
            }

            UserQuizAttempt newAttempt = new UserQuizAttempt();
            newAttempt.setUserId(currentUserId);
            newAttempt.setQuizId(quizId);
            newAttempt.setStartedAt(LocalDateTime.now());

            UserQuizAttempt savedAttempt = userQuizAttemptRepository.save(newAttempt);

            return QuizAttemptResponse.builder()
                    .status("NEW_ATTEMPT")
                    .message("New quiz attempt created")
                    .attempt(savedAttempt)
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Error processing quiz attempt", e);
        }
    }

    @Override
    public UserQuizAttempt submitQuizAttempt(QuizAttemptRequest request) {
        Long currentUserId = securityUtils.getCurrentUserId();

        UserQuizAttempt attempt = userQuizAttemptRepository
                .findByUserIdAndQuizIdAndCompletedAtIsNull(currentUserId, request.getQuizId())
                .orElseThrow(() -> new ResourceNotFoundException("No active quiz attempt found"));

        Quiz quiz = quizRepository.findById(request.getQuizId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found"));

        List<UserQuestionAnswer> answers = evaluateAnswers(request.getAnswers(), quiz.getQuestions());
        double totalScore = calculateTotalScore(answers);
        boolean passed = isPassed(totalScore, quiz.getPassingScore());

        attempt.setAnswers(answers);
        attempt.setScore(totalScore);
        attempt.setPassed(passed);
        attempt.setCompletedAt(LocalDateTime.now());

        return userQuizAttemptRepository.save(attempt);
    }

    @Override
    public QuizResultResponse getQuizResult(String attemptId) {
        UserQuizAttempt attempt = userQuizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz attempt not found"));

        Long currentUserId = securityUtils.getCurrentUserId();
        if(!attempt.getUserId().equals(currentUserId)){
            throw new UnauthorizedException("You are not authorized to view this quiz result");
        }

        Quiz quiz = quizRepository.findById(attempt.getQuizId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found!"));

        Map<String, Question> questionMap = quiz.getQuestions().stream()
                .collect(Collectors.toMap(Question::getId, q->q));

        List<QuestionResultResponse> questionResults = attempt.getAnswers().stream()
                .map(answer -> buildQuestionResult(answer, questionMap.get(answer.getQuestionId())))
                .collect(Collectors.toList());

        Map<String, Object> statistics = calculateStatistics(attempt, questionResults);

        Double totalTimeSpent = attempt.getAnswers().stream()
                .mapToDouble(UserQuestionAnswer::getTimeSpent)
                .sum();

        return QuizResultResponse.builder()
                .quizId(attempt.getQuizId())
                .score(attempt.getScore())
                .passed(attempt.getPassed())
                .startedAt(attempt.getStartedAt())
                .completedAt(attempt.getCompletedAt())
                .totalTimeSpent(totalTimeSpent)
                .questionResults(questionResults)
                .statistics(statistics)
                .build();
    }

    @Override
    public Page<UserQuizAttemptResponse> getUserQuizAttempts(String quizTitle, Boolean passed, LocalDate startedAt,
                                                             LocalDate completedAt, int pageNumber, int pageSize,
                                                             String sortField, Sort.Direction sortDirection) {
        Long currentUserId = securityUtils.getCurrentUserId();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortDirection, sortField));

        Query query = new Query().with(pageable);
        query.addCriteria(Criteria.where("userId").is(currentUserId));

        if(passed != null){
            query.addCriteria(Criteria.where("passed").is(passed));
        }
        if(startedAt != null){
            query.addCriteria(Criteria.where("createdAt").is(startedAt));
        }

        if(quizTitle != null && !quizTitle.isEmpty()){
            Query quizQuery = new Query();
            String escapedTitle = Pattern.quote(quizTitle.toLowerCase());
            quizQuery.addCriteria(Criteria.where("title").regex(".*" + escapedTitle + ".*", "i"));
            List<Quiz> quizzes = mongoTemplate.find(quizQuery, Quiz.class);
            List<String> quizIds = quizzes.stream().map(Quiz::getId).collect(Collectors.toList());

            if(!quizIds.isEmpty()){
                query.addCriteria(Criteria.where("quizId").in(quizIds));
            }else{
                return new PageImpl<>(Collections.emptyList(), pageable, 0);
            }
        }

        List<UserQuizAttempt> attempts = mongoTemplate.find(query, UserQuizAttempt.class);
        long total = mongoTemplate.count(query.skip(-1).limit(-1), UserQuizAttempt.class);

        Map<String, Quiz> quizMap = getQuizMapForAttempts(attempts);

        List<UserQuizAttemptResponse> responses = attempts.stream()
                .map(attempt -> builtAttemptResponse(attempt, quizMap.get(attempt.getQuizId())))
                .collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, total);
    }

    private QuestionResultResponse buildQuestionResult(UserQuestionAnswer answer, Question question){
        return QuestionResultResponse.builder()
                .questionId(question.getId())
                .prompt(question.getPrompt())
                .content(question.getContent())
                .selectedOptions(answer.getSelectedOptions())
                .options(question.getOptions())
                .correctAnswers(question.getCorrectAnswers())
                .isCorrect(answer.getIsCorrect())
                .points(question.getPoints())
                .earnedPoints(answer.getPoints())
                .timeSpent(answer.getTimeSpent())
                .explanation(question.getExplanation())
                .build();
    }

    private Map<String, Object> calculateStatistics(UserQuizAttempt attempt,
                                                    List<QuestionResultResponse> questionResult){
        Map<String, Object> statistics = new HashMap<>();

        long correctAnswers = questionResult.stream()
                .filter(QuestionResultResponse::getIsCorrect)
                .count();
        double accuracy = (double) correctAnswers / questionResult.size() * 100;

        double avgTimePerQuestion = questionResult.stream()
                .mapToLong(QuestionResultResponse::getTimeSpent)
                .average()
                .orElse(0) / 1000.0;

        statistics.put("totalQuestions", questionResult.size());
        statistics.put("correctAnswers", correctAnswers);
        statistics.put("incorrectAnswers", questionResult.size() - correctAnswers);
        statistics.put("accuracy", Math.round(accuracy * 100.0) / 100.0);
        statistics.put("averageTimePerQuestion", Math.round(avgTimePerQuestion * 100.0) / 100.0);

        return statistics;
    }

    private List<UserQuestionAnswer> evaluateAnswers(List<UserQuestionAnswerRequest> userAnswers,
                                                     List<Question> questions) {
        Map<String, Question> questionMap = questions.stream()
                .collect(Collectors.toMap(Question::getId, q -> q));

        return userAnswers.stream().map(userAnswer -> {
            Question question = questionMap.get(userAnswer.getQuestionId());
            if (question == null) {
                throw new ResourceNotFoundException(
                        "Question not found with id: " + userAnswer.getQuestionId()
                );
            }

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

    private boolean evaluatedAnswer(List<String> selectedOptions, List<String> correctAnswers) {
        if (selectedOptions == null || correctAnswers == null) {
            return false;
        }
        return new HashSet<>(selectedOptions).equals(new HashSet<>(correctAnswers));
    }

    private double calculateTotalScore(List<UserQuestionAnswer> answers) {
        return answers.stream()
                .mapToInt(UserQuestionAnswer::getPoints)
                .sum();
    }

    private boolean isPassed(double totalScore, Integer passingScore) {
        return totalScore >= passingScore;
    }

    private Map<String, Quiz> getQuizMapForAttempts(List<UserQuizAttempt> attempts){
        List<String> quizIds = attempts.stream()
                .map(UserQuizAttempt::getQuizId)
                .distinct()
                .collect(Collectors.toList());

        return quizRepository.findAllById(quizIds).stream()
                .collect(Collectors.toMap(Quiz::getId, quiz -> quiz));
    }

    private UserQuizAttemptResponse builtAttemptResponse(UserQuizAttempt attempt, Quiz quiz){
        return UserQuizAttemptResponse.builder()
                .attemptId(attempt.getId())
                .quizId(attempt.getQuizId())
                .quizTitle(quiz != null ? quiz.getTitle() : "Unknown Quiz")
                .score(attempt.getScore())
                .passed(attempt.getPassed())
                .startedAt(attempt.getStartedAt())
                .completedAt(attempt.getCompletedAt())
                .build();
    }
}
