package com.example.elearningapi.mapper;


import com.example.elearningapi.beans.request.LessonRequest;
import com.example.elearningapi.beans.response.lesson.LessonResponse;
import com.example.elearningapi.beans.response.lesson.ShortLessonResponse;
import com.example.elearningapi.entity.Course;
import com.example.elearningapi.entity.Lesson;
import com.example.elearningapi.exception.ResourceNotFoundException;
import com.example.elearningapi.repository.CourseRepository;
import com.example.elearningapi.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class LessonMapper {
    private final CourseRepository courseRepository;
    private final UploadService uploadService;

    public void convertToEntity(Lesson lesson, LessonRequest lessonRequest) {
        lesson.setName(lessonRequest.getName());
        lesson.setDescription(lessonRequest.getDescription());
        lesson.setStatus(lessonRequest.getStatus());
        lesson.setCreatedAt(LocalDateTime.now());
        lesson.setUpdatedAt(LocalDateTime.now());

        if (lessonRequest.getThumbnail() != null && !lessonRequest.getThumbnail().isEmpty()) {
            String uploadUrl = uploadService.uploadFile(lessonRequest.getThumbnail());
            lesson.setThumbnail(uploadUrl);
        } else {
            lesson.setThumbnail(lesson.getThumbnail());
        }

        Course course = courseRepository.findById(lessonRequest.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        lesson.setCourse(course);

    }

    public LessonResponse convertToResponse(Lesson lesson) {
        LessonResponse lessonResponse = new LessonResponse();
        lessonResponse.setId(lesson.getId());
        lessonResponse.setName(lesson.getName());
        lessonResponse.setDescription(lesson.getDescription());
        lessonResponse.setThumbnail(lesson.getThumbnail());
        lessonResponse.setStatus(lesson.getStatus());
        lessonResponse.setCreatedAt(lesson.getCreatedAt());
        lessonResponse.setUpdatedAt(lesson.getUpdatedAt());
        return lessonResponse;
    }

    public ShortLessonResponse convertToShortResponse(Lesson lesson) {
        ShortLessonResponse lessonResponse = new ShortLessonResponse();
        lessonResponse.setId(lesson.getId());
        lessonResponse.setName(lesson.getName());
        lessonResponse.setThumbnail(lesson.getThumbnail());
        lessonResponse.setStatus(lesson.getStatus());
        return lessonResponse;
    }
}
