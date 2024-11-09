package com.example.elearningapi.controller.site;

import com.example.elearningapi.beans.request.CourseEnrollRequest;
import com.example.elearningapi.beans.request.UpdateLearningTimeRequest;
import com.example.elearningapi.beans.response.UserCourseResponse;
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

    @GetMapping("/users/{userId}/courses")
    public ResponseEntity<List<UserCourseResponse>> getUserCourses(
            @PathVariable Long userId,
            @RequestParam(required = false) UserCourseStatus status) {
        List<UserCourseResponse> course = courseProgressService.getUserCourses(userId, status);
        return ResponseEntity.ok(course);
    }

    @GetMapping("/users/{userId}/courses/{courseId}")
    public ResponseEntity<UserProgressResponse> getUserCourseProgress(
            @PathVariable Long userId,
            @PathVariable Long courseId) {
        UserProgressResponse progress = courseProgressService.getUserProgress(userId, courseId);
        return ResponseEntity.ok(progress);
    }

    @PostMapping("/enroll")
    public ResponseEntity<UserCourseResponse> enrollCourse(
            @Valid @RequestBody CourseEnrollRequest request) {
        UserCourseResponse enrolled = courseProgressService.enrollCourse(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(enrolled);
    }

//    @PatchMapping("/lessons/{lessonId}/complete")
//    public ResponseEntity<UserLessonResponse> completeLesson(
//            @PathVariable Long lessonId,
//            @RequestBody LessonCompletionRequest request) {
//        UserLessonResponse completed = courseProgressService.completeLesson(lessonId, request);
//        return ResponseEntity.ok(completed);
//    }

    @PostMapping("/learning-time")
    public ResponseEntity<Void> updateLearningTime(@RequestBody UpdateLearningTimeRequest request) {
        courseProgressService.updateLearningTime(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{userId}/statistics")
    public ResponseEntity<Map<String, Object>> getUserStatistics(@PathVariable Long userId) {
        Map<String, Object> statistics = courseProgressService.getUserStatistics(userId);
        return ResponseEntity.ok(statistics);
    }

}
