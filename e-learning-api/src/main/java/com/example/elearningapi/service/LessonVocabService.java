package com.example.elearningapi.service;

import com.example.elearningapi.beans.request.LessonVocabRequest;
import com.example.elearningapi.beans.response.lesson.LessonVocabResponse;
import com.example.elearningapi.beans.response.lesson.LessonVocabShortResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LessonVocabService {

    LessonVocabResponse getVocabByLessonId(Long lessonId);

    LessonVocabShortResponse getVocabShortByLessonId(Long lessonId);

    void addVocabToLesson(LessonVocabRequest request);

    void deleteVocabsFromLesson(Long lessonId, List<Long> vocabIds);
}
