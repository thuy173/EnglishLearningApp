package com.example.elearningapi.service;

import com.example.elearningapi.beans.request.progress.UserLearningProgressRequest;
import com.example.elearningapi.beans.response.UserCourseResponse;
import com.example.elearningapi.beans.response.progress.UserLearningProgressResponse;
import com.example.elearningapi.entity.Lesson;
import org.springframework.stereotype.Service;

@Service
public interface CourseProgressService {

    UserCourseResponse enrollCourse(Long courseId);

    UserLearningProgressResponse submitLessonProgress(UserLearningProgressRequest request);

    UserLearningProgressResponse getCourseProgress(Long courseId);

    void handleNewLessonInCourse(Long courseId, Lesson newLesson);
}
