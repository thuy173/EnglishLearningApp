package com.example.elearningapi.beans.response.progress;

import com.example.elearningapi.enums.UserLessonStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class LessonProgressResponse {
    private Long lessonId;
    private String lessonName;
    private LocalDateTime startDate;
    private LocalDateTime completedDate;
    private UserLessonStatus status;
    private Integer score;
    private Integer timeSpent;
    private Integer totalVocabs;
    private Integer correctVocabs;
    private Integer incorrectVocabs;
}
