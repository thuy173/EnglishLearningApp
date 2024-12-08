package com.example.elearningapi.controller.admin;

import com.example.elearningapi.beans.request.testing.QuizRequest;
import com.example.elearningapi.beans.response.testing.QuizResponse;
import com.example.elearningapi.service.TestingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/testing")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class AdminTestingController {
    private final TestingService testingService;

    @PostMapping
    public ResponseEntity<QuizResponse> createQuiz(@RequestBody QuizRequest quizRequest) {
        QuizResponse quizResponse = testingService.createQuiz(quizRequest);
        return ResponseEntity.ok(quizResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuizResponse> updateQuiz(@PathVariable("id") String id, @RequestBody QuizRequest quizRequest) {
        testingService.updateQuiz(id, quizRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Page<QuizResponse>> getAllQuizzes(
            @RequestParam(required = false) String name,
            @RequestParam Long lessonId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection) {
        Page<QuizResponse> quizzes = testingService.getAllQuizzes(name, lessonId, pageNumber, pageSize, sortField, sortDirection);
        return ResponseEntity.ok(quizzes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLevel(@PathVariable String id) {
        testingService.deleteOne(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultiple(@RequestBody List<String> ids) {
        testingService.deleteMultiple(ids);
        return ResponseEntity.ok("Tests deleted successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizResponse> getQuiz(@PathVariable String id) {
        QuizResponse quizResponse = testingService.getQuiz(id);
        return ResponseEntity.ok(quizResponse);
    }

}
