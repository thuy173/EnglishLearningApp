package com.example.elearningapi.service;

import com.example.elearningapi.beans.request.CourseEnrollRequest;
import com.example.elearningapi.beans.request.UpdateLearningTimeRequest;
import com.example.elearningapi.beans.response.UserCourseResponse;
import com.example.elearningapi.beans.response.user.UserProgressResponse;
import com.example.elearningapi.entity.UserCourse;
import com.example.elearningapi.enums.UserCourseStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface CourseProgressService {

    UserProgressResponse getUserProgress(Long userId, Long courseId);

    UserCourseResponse enrollCourse(CourseEnrollRequest request);

    void updateLearningTime(UpdateLearningTimeRequest request);

    Map<String, Object> getUserStatistics(Long userId);

    List<UserCourseResponse> getUserCourses(Long userId, UserCourseStatus status);
}
