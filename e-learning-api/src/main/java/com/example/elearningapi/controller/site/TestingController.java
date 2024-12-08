package com.example.elearningapi.controller.site;

import com.example.elearningapi.beans.request.testing.QuizAttemptRequest;
import com.example.elearningapi.beans.response.testing.*;
import com.example.elearningapi.entity.UserQuizAttempt;
import com.example.elearningapi.service.TestingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/testing")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class TestingController {
    private final TestingService testingService;

    @GetMapping
    public ResponseEntity<Page<QuizShortResponse>> getAllQuiz(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Long lessonId,
            @RequestParam(required = true) Long levelId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection) {

        Page<QuizShortResponse> quizData = testingService.getAllData(
                title, levelId, lessonId, pageNumber, pageSize, sortField, sortDirection);

        return ResponseEntity.ok(quizData);
    }

    @GetMapping("user-attempt")
    public ResponseEntity<Page<UserQuizAttemptResponse>> getUserQuizAttempts(
            @RequestParam(required = false) String quizTitle,
            @RequestParam(required = false) Boolean passed,
            @RequestParam(required = false) LocalDate startedAt,
            @RequestParam(required = false) LocalDate completedAt,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "score") String sortField,
            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection
            ){
        Page<UserQuizAttemptResponse> attempts = testingService.getUserQuizAttempts(
                quizTitle, passed, startedAt, completedAt, pageNumber, pageSize, sortField, sortDirection
        );
        return ResponseEntity.ok(attempts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizResponse> getQuiz(@PathVariable String id) {
        QuizResponse quizResponse = testingService.getQuiz(id);
        return ResponseEntity.ok(quizResponse);
    }

    @PostMapping("/{quizId}/attempts")
    public ResponseEntity<QuizAttemptResponse> startQuizAttempt(
            @PathVariable String quizId){
        QuizAttemptResponse attempt = testingService.startQuizAttempt( quizId);
        return new ResponseEntity<>(attempt, HttpStatus.CREATED);
    }

    @PutMapping("/{quizId}/attempts")
    public ResponseEntity<UserQuizAttempt> submitQuizAttempt(
            @PathVariable String quizId,
            @RequestBody QuizAttemptRequest request){

        if(!quizId.equals(request.getQuizId())){
            return ResponseEntity.badRequest().build();
        }
        UserQuizAttempt result = testingService.submitQuizAttempt(request);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{attemptId}/result")
    public ResponseEntity<QuizResultResponse> getResultAttempt(@PathVariable String attemptId){
        QuizResultResponse resultResponse = testingService.getQuizResult(attemptId);
        return ResponseEntity.ok(resultResponse);
    }
}
