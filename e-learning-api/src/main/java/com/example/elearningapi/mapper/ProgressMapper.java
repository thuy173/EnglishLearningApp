package com.example.elearningapi.mapper;

import com.example.elearningapi.beans.response.progress.LessonProgressResponse;
import com.example.elearningapi.entity.LessonVocab;
import com.example.elearningapi.entity.UserLesson;
import com.example.elearningapi.entity.UserVocab;
import com.example.elearningapi.repository.LessonVocabRepository;
import com.example.elearningapi.repository.UserVocabRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProgressMapper {
    private final LessonVocabRepository lessonVocabRepository;
    private final UserVocabRepository userVocabRepository;

    public LessonProgressResponse mapToLessonProgressDetail(UserLesson userLesson) {
        // Get vocab statistics for the lesson
        List<LessonVocab> lessonVocabs = lessonVocabRepository
                .findByLessonId(userLesson.getLesson().getId());

        List<Long> vocabIds = lessonVocabs.stream()
                .map(lv -> lv.getVocab().getId())
                .collect(Collectors.toList());

        // Get user's progress for these vocabs
        List<UserVocab> userVocabs = userVocabRepository
                .findByUserIdAndVocabIds(
                        userLesson.getUserCourse().getUser().getId(),
                        vocabIds
                );

        int correctVocabs = (int) userVocabs.stream()
                .filter(uv -> uv.getCorrectCount() > 0)
                .count();

        int incorrectVocabs = (int) userVocabs.stream()
                .filter(uv -> uv.getIncorrectCount() > 0)
                .count();

        return LessonProgressResponse.builder()
                .lessonId(userLesson.getLesson().getId())
                .lessonName(userLesson.getLesson().getName())
                .startDate(userLesson.getStartDate())
                .completedDate(userLesson.getCompletedDate())
                .status(userLesson.getStatus())
                .score(userLesson.getScore())
                .timeSpent(userLesson.getTimeSpent())
                .totalVocabs(lessonVocabs.size())
                .correctVocabs(correctVocabs)
                .incorrectVocabs(incorrectVocabs)
                .build();
    }
}
