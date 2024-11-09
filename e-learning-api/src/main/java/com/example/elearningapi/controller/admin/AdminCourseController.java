package com.example.elearningapi.controller.admin;

import com.example.elearningapi.beans.request.CourseRequest;
import com.example.elearningapi.beans.response.course.CourseResponse;
import com.example.elearningapi.beans.response.course.ShortCourseResponse;
import com.example.elearningapi.enums.CourseStatus;
import com.example.elearningapi.service.CourseService;
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
@RequestMapping("/api/admin/courses")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class AdminCourseController {
    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<Page<ShortCourseResponse>> getAllCourses(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) CourseStatus status,
            @RequestParam(required = true) Integer categoryId,
            @RequestParam(required = false) Integer levelId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection) {

        Page<ShortCourseResponse> courses = courseService.getAllData(
                name, status,categoryId, levelId, pageNumber, pageSize, sortField, sortDirection);

        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public CourseResponse getCourseById(@PathVariable Long id) {
        return courseService.getById(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> addCourse(@Valid @ModelAttribute CourseRequest courseRequest) {
        courseService.createData(courseRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping(value = "/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateCourse(@PathVariable Long id, @Valid @ModelAttribute CourseRequest courseRequest) {
        courseService.updateData(id, courseRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteOne(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultiple(@RequestBody List<Long> ids) {
        courseService.deleteMultiple(ids);
        return ResponseEntity.ok("Courses deleted successfully");
    }
}
