package com.example.elearningapi.controller.admin;

import com.example.elearningapi.beans.request.testing.QuestionRequest;
import com.example.elearningapi.beans.response.testing.QuestionResponse;
import com.example.elearningapi.entity.Question;
import com.example.elearningapi.service.QuestionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/questions")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class AdminQuestionController {
    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<QuestionResponse> addQuestion(@Valid @RequestBody QuestionRequest request) {
        return ResponseEntity.ok(questionService.createQuestion(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable String id) {
        questionService.deleteOne(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultiple(@RequestBody List<String> ids) {
        questionService.deleteMultiple(ids);
        return ResponseEntity.ok("Questions deleted successfully");
    }
}
