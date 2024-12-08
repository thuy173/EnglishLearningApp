package com.example.elearningapi.controller.site;

import com.example.elearningapi.beans.response.course.CourseResponse;
import com.example.elearningapi.beans.response.course.ShortCourseResponse;
import com.example.elearningapi.enums.CourseStatus;
import com.example.elearningapi.service.CourseService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class CourseController {
    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<Page<ShortCourseResponse>> getAllCourses(
            @RequestParam(required = false) String name,
            @RequestParam(required = true) Integer categoryId,
            @RequestParam(required = false) Integer levelId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection) {

        Page<ShortCourseResponse> courses = courseService.getAllData(
                name, CourseStatus.PUBLISHED, categoryId, levelId, pageNumber, pageSize, sortField, sortDirection);

        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public CourseResponse getCourseById(@PathVariable Long id) {
        return courseService.getById(id);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<ShortCourseResponse>> getLatestCourses(){
        return ResponseEntity.ok(courseService.getLatestCourses());
    }

    @GetMapping("/most-enrolled")
    public ResponseEntity<List<ShortCourseResponse>> getMostEnrolledCourses(){
        return ResponseEntity.ok(courseService.getMostEnrolledCourses());
    }

    @GetMapping("/random")
    public ResponseEntity<List<ShortCourseResponse>> getRandomCourses(){
        return ResponseEntity.ok(courseService.getRandomCourses());
    }
}
