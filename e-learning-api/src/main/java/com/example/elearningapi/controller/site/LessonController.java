package com.example.elearningapi.controller.site;

import com.example.elearningapi.beans.response.lesson.LessonResponse;
import com.example.elearningapi.beans.response.lesson.ShortLessonResponse;
import com.example.elearningapi.enums.LessonStatus;
import com.example.elearningapi.service.LessonService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class LessonController {
    private final LessonService lessonService;

    @GetMapping
    public ResponseEntity<Page<ShortLessonResponse>> getAllLessons(
            @RequestParam(required = false) String name,
            @RequestParam(required = true) Long courseId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection) {

        Page<ShortLessonResponse> lessons = lessonService.getAllData(
                name, courseId, LessonStatus.READY, pageNumber, pageSize, sortField, sortDirection);

        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/{id}")
    public LessonResponse getLessonById(@PathVariable Long id) {
        return lessonService.getById(id);
    }
}
