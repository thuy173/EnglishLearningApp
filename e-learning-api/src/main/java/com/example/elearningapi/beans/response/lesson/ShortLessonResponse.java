package com.example.elearningapi.beans.response.lesson;

import com.example.elearningapi.enums.LessonStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ShortLessonResponse {
    private Long id;
    private String name;
    private String thumbnail;
    private String description;
    private LessonStatus status;
    private Integer vocabCount;
    private Integer knownVocabCount;
}
