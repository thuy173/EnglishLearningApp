package com.example.elearningapi.beans.response.lesson;

import com.example.elearningapi.enums.LessonStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LessonResponse {
    private Long id;
    private String name;
    private String description;
    private LessonStatus status;
    private String thumbnail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
