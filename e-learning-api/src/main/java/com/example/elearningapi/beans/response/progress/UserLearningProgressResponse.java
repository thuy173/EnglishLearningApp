package com.example.elearningapi.beans.response.progress;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserLearningProgressResponse {
    private Long courseId;
    private String courseName;
    private Integer totalLessons;
    private Integer completedLessons;
    private Double progressPercentage;
    private List<LessonProgressResponse> lessonProgress;
}
