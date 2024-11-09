package com.example.elearningapi.beans.response.lesson;

import com.example.elearningapi.beans.response.vocabulary.VocabShortResponse;
import lombok.Data;

import java.util.List;

@Data
public class LessonVocabShortResponse {
    private String lessonName;
    private List<VocabShortResponse> vocabularies;
}
