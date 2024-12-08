package com.example.elearningapi.controller.site;

import com.example.elearningapi.beans.request.UpdateLearningTimeRequest;
import com.example.elearningapi.beans.request.progress.UserLearningProgressRequest;
import com.example.elearningapi.beans.response.UserCourseResponse;
import com.example.elearningapi.beans.response.progress.UserLearningProgressResponse;
import com.example.elearningapi.beans.response.user.UserProgressResponse;
import com.example.elearningapi.enums.UserCourseStatus;
import com.example.elearningapi.service.CourseProgressService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class CourseProgressController {
    private final CourseProgressService courseProgressService;

    @PostMapping("/{courseId}/enroll")
    public ResponseEntity<UserCourseResponse> enrollCourse(
            @PathVariable Long courseId) {
        UserCourseResponse enrolled = courseProgressService.enrollCourse(courseId);
        return ResponseEntity.status(HttpStatus.CREATED).body(enrolled);
    }

    @PostMapping("/lesson/submit")
    public ResponseEntity<UserLearningProgressResponse> submitLessonProgress(
            @Valid @RequestBody UserLearningProgressRequest request) {
        UserLearningProgressResponse response = courseProgressService.submitLessonProgress(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/courses/{courseId}")
    public ResponseEntity<UserLearningProgressResponse> getCourseProgress(
            @PathVariable Long courseId) {
        UserLearningProgressResponse response = courseProgressService.getCourseProgress(courseId);
        return ResponseEntity.ok(response);
    }
    
}
