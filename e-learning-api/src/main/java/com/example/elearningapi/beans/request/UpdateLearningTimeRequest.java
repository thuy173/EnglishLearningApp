package com.example.elearningapi.beans.request;

import lombok.Data;

@Data
public class UpdateLearningTimeRequest {
    private Long userCourseId;
    private Long lessonId;
    private Integer learningTimeInMinutes;
    private Boolean isCompleted;
    private Integer score;
}
