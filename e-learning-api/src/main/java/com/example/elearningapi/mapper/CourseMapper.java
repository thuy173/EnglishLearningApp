package com.example.elearningapi.mapper;

import com.example.elearningapi.beans.request.CourseRequest;
import com.example.elearningapi.beans.response.course.CourseResponse;
import com.example.elearningapi.beans.response.course.ShortCourseResponse;
import com.example.elearningapi.entity.Category;
import com.example.elearningapi.entity.Course;
import com.example.elearningapi.entity.Level;
import com.example.elearningapi.exception.ResourceNotFoundException;
import com.example.elearningapi.repository.CategoryRepository;
import com.example.elearningapi.repository.LevelRepository;
import com.example.elearningapi.repository.UserLessonRepository;
import com.example.elearningapi.service.UploadService;
import com.example.elearningapi.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class CourseMapper {
    private final CategoryRepository categoryRepository;
    private final LevelRepository levelRepository;
    private final UploadService uploadService;
    private final UserLessonRepository userLessonRepository;
    private final SecurityUtils securityUtils;

    public void convertToEntity(Course course, CourseRequest courseRequest) {
        course.setName(courseRequest.getName());
        course.setDescription(courseRequest.getDescription());
        course.setAudience(courseRequest.getAudience());
        course.setTarget(courseRequest.getTarget());
        course.setContent(courseRequest.getContent());
        course.setPrice(courseRequest.getPrice());
        course.setStatus(courseRequest.getStatus());
        course.setCreatedAt(LocalDateTime.now());
        course.setUpdatedAt(LocalDateTime.now());

        if (courseRequest.getThumbnail() != null && !courseRequest.getThumbnail().isEmpty()) {
            String uploadUrl = uploadService.uploadFile(courseRequest.getThumbnail());
            course.setThumbnail(uploadUrl);
        } else {
            course.setThumbnail(course.getThumbnail());
        }

        Category category = categoryRepository.findById(courseRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        course.setCategory(category);

        Level level = levelRepository.findById(courseRequest.getLevelId())
                .orElseThrow(() -> new ResourceNotFoundException("Level not found"));

        course.setLevel(level);

    }

    public CourseResponse convertToResponse(Course course) {
        CourseResponse courseResponse = new CourseResponse();
        courseResponse.setId(course.getId());
        courseResponse.setName(course.getName());
        courseResponse.setDescription(course.getDescription());
        courseResponse.setAudience(course.getAudience());
        courseResponse.setTarget(course.getTarget());
        courseResponse.setContent(course.getContent());
        courseResponse.setThumbnail(course.getThumbnail());
        courseResponse.setPrice(course.getPrice());
        courseResponse.setStatus(course.getStatus());
        courseResponse.setCategoryId(course.getCategory().getId());
        courseResponse.setLevelId(course.getLevel().getId());
        courseResponse.setCreatedAt(course.getCreatedAt());
        courseResponse.setUpdatedAt(course.getUpdatedAt());
        return courseResponse;
    }

    public ShortCourseResponse convertToShortResponse(Course course) {
        Long userId = securityUtils.getCurrentUserId();
        ShortCourseResponse courseResponse = new ShortCourseResponse();
        courseResponse.setId(course.getId());
        courseResponse.setName(course.getName());
        courseResponse.setThumbnail(course.getThumbnail());
        courseResponse.setDescription(course.getDescription());
        courseResponse.setStatus(course.getStatus());
        courseResponse.setCategoryName(course.getCategory().getName());
        courseResponse.setLevelName(course.getLevel().getName());
        courseResponse.setTotalLessons(course.getLessons() != null ? course.getLessons().size() : 0);
        courseResponse.setCompletedLessons(userLessonRepository.countCompletedLessonInCourse(userId,course.getId()));
        return courseResponse;
    }
}
