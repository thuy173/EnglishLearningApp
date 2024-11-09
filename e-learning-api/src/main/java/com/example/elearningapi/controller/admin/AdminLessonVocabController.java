package com.example.elearningapi.controller.admin;

import com.example.elearningapi.beans.request.LessonVocabRequest;
import com.example.elearningapi.beans.response.lesson.LessonVocabResponse;
import com.example.elearningapi.service.LessonVocabService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/lesson-vocab")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class AdminLessonVocabController {
    private final LessonVocabService lessonVocabService;

    @GetMapping("/{lessonId}")
    public ResponseEntity<LessonVocabResponse> getVocabByLesson(@PathVariable Long lessonId) {
        LessonVocabResponse vocabs = lessonVocabService.getVocabByLessonId(lessonId);
        return ResponseEntity.ok(vocabs);
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addVocabToLesson(@Valid @RequestBody LessonVocabRequest request) {
       lessonVocabService.addVocabToLesson(request);
       return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{lessonId}/vocabs")
    public ResponseEntity<String> deleteMultiple(
            @PathVariable Long lessonId,
            @RequestBody List<Long> vocabIds
    ) {
        lessonVocabService.deleteVocabsFromLesson(lessonId, vocabIds);
        return ResponseEntity.ok("Vocab deleted successfully");
    }
}
