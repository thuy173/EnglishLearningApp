package com.example.elearningapi.beans.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserCourseResponse {
    private Long id;
    private Long userId;
    private String userName;
    private Long courseId;
    private String courseName;
    private LocalDateTime enrollDate;
    private String status;
    private Integer progressPercentage;
    private List<UserLessonResponse> lessons;
}
