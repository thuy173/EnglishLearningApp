package com.example.elearningapi.beans.response.lesson;

import com.example.elearningapi.beans.response.vocabulary.VocabularyResponse;
import lombok.Data;

import java.util.List;

@Data
public class LessonVocabResponse {
    private String lessonName;
    private List<VocabularyResponse> vocabularies;
}
