package com.example.elearningapi.beans.request.progress;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class UserLearningProgressRequest {
    private Long courseId;
    private Long lessonId;
    private LocalDateTime startDate;
    private LocalDateTime completedDate;
    private Integer score;
    private Integer timeSpent;
    private List<VocabProgressRequest> vocabProgress;
}
