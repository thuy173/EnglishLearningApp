package com.example.elearningapi.repository;

import com.example.elearningapi.entity.LessonVocab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonVocabRepository extends JpaRepository<LessonVocab, Long> {
    List<LessonVocab> findByLessonId(Long lessonId);
    List<LessonVocab> findByLessonIdAndVocabIdIn(Long lessonId, List<Long> vocabIds);

}
