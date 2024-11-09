package com.example.elearningapi.controller.site;

import com.example.elearningapi.beans.response.lesson.LessonVocabResponse;
import com.example.elearningapi.beans.response.lesson.LessonVocabShortResponse;
import com.example.elearningapi.service.LessonVocabService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/lesson-vocab")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class LessonVocabController {
    private final LessonVocabService lessonVocabService;

    @GetMapping("/{lessonId}")
    public ResponseEntity<LessonVocabResponse> getVocabByLesson(@PathVariable Long lessonId) {
        LessonVocabResponse vocabs = lessonVocabService.getVocabByLessonId(lessonId);
        return ResponseEntity.ok(vocabs);
    }

    @GetMapping("/short/{lessonId}")
    public ResponseEntity<LessonVocabShortResponse> getVocabShortByLesson(@PathVariable Long lessonId) {
        LessonVocabShortResponse vocabs = lessonVocabService.getVocabShortByLessonId(lessonId);
        return ResponseEntity.ok(vocabs);
    }
}
