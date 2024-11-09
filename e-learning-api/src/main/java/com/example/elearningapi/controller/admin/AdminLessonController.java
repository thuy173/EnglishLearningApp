package com.example.elearningapi.controller.admin;

import com.example.elearningapi.beans.request.LessonRequest;
import com.example.elearningapi.beans.response.lesson.LessonResponse;
import com.example.elearningapi.beans.response.lesson.ShortLessonResponse;
import com.example.elearningapi.enums.LessonStatus;
import com.example.elearningapi.service.LessonService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/lessons")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class AdminLessonController {
    private final LessonService lessonService;

    @GetMapping
    public ResponseEntity<Page<ShortLessonResponse>> getAllLessons(
            @RequestParam(required = false) String name,
            @RequestParam(required = false)LessonStatus status,
            @RequestParam(required = false) Long courseId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection) {

        Page<ShortLessonResponse> lessons = lessonService.getAllData(
                name, courseId, status, pageNumber, pageSize, sortField, sortDirection);

        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/{id}")
    public LessonResponse getLessonById(@PathVariable Long id) {
        return lessonService.getById(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> addLesson(@Valid @ModelAttribute LessonRequest lessonRequest) {
        lessonService.createData(lessonRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateLesson(@PathVariable Long id, @Valid @ModelAttribute LessonRequest lessonRequest) {
        lessonService.updateData(id, lessonRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable Long id) {
        lessonService.deleteOne(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultiple(@RequestBody List<Long> ids) {
        lessonService.deleteMultiple(ids);
        return ResponseEntity.ok("Lessons deleted successfully");
    }
}
