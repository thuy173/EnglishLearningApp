package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.response.DashboardResponse;
import com.example.elearningapi.repository.CourseRepository;
import com.example.elearningapi.repository.LessonRepository;
import com.example.elearningapi.repository.UserRepository;
import com.example.elearningapi.repository.VocabRepository;
import com.example.elearningapi.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;
    private final VocabRepository vocabRepository;

    @Override
    public DashboardResponse getDashboard() {
        Long totalCourses = courseRepository.count();
        Long totalLessons = lessonRepository.count();
        Long totalUsers = userRepository.count();
        Long totalVocabularies = vocabRepository.count();
        return DashboardResponse.builder()
                .totalCourses(totalCourses)
                .totalLessons(totalLessons)
                .totalUsers(totalUsers)
                .totalVocabularies(totalVocabularies)
                .build();
    }
}
