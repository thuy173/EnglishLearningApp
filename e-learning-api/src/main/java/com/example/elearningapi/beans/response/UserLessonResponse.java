package com.example.elearningapi.beans.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserLessonResponse {
    private Long id;
    private Long lessonId;
    private String lessonTitle;
    private String status;
    private Integer score;
    private Integer timeSpent;
    private LocalDateTime completedDate;
}
