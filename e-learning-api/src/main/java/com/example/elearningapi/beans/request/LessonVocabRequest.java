package com.example.elearningapi.beans.request;

import lombok.Data;

import java.util.List;

@Data
public class LessonVocabRequest {
    private Long lessonId;
    private List<Long> vocabIds;
}
