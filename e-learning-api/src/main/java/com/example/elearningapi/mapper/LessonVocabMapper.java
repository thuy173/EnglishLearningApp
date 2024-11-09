package com.example.elearningapi.mapper;

import com.example.elearningapi.beans.request.LessonVocabRequest;
import com.example.elearningapi.beans.response.lesson.LessonVocabResponse;
import com.example.elearningapi.beans.response.lesson.LessonVocabShortResponse;
import com.example.elearningapi.beans.response.vocabulary.VocabShortResponse;
import com.example.elearningapi.beans.response.vocabulary.VocabularyResponse;
import com.example.elearningapi.entity.Lesson;
import com.example.elearningapi.entity.LessonVocab;
import com.example.elearningapi.entity.Vocabulary;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class LessonVocabMapper {

    public LessonVocabResponse toResponse(List<LessonVocab> lessonVocabs) {

        if (lessonVocabs.isEmpty()) {
            return new LessonVocabResponse();
        }

        String lessonName = lessonVocabs.get(0).getLesson().getName();

        List<VocabularyResponse> vocabResponses = lessonVocabs.stream()
                .map(lessonVocab -> {
                    VocabularyResponse vocab = new VocabularyResponse();
                    vocab.setId(lessonVocab.getVocab().getId());
                    vocab.setWord(lessonVocab.getVocab().getWord());
                    vocab.setIpa(lessonVocab.getVocab().getIpa());
                    vocab.setImage(lessonVocab.getVocab().getImage());
                    vocab.setMeaning(lessonVocab.getVocab().getMeaning());
                    vocab.setSynonym(lessonVocab.getVocab().getSynonym());
                    vocab.setDefinition(lessonVocab.getVocab().getDefinition());
                    vocab.setExample(lessonVocab.getVocab().getExample());
                    vocab.setCollocation(lessonVocab.getVocab().getCollocations());
                    return vocab;
                })
                .collect(Collectors.toList());

        LessonVocabResponse response = new LessonVocabResponse();
        response.setLessonName(lessonName);
        response.setVocabularies(vocabResponses);
        return response;
    }

    public LessonVocabShortResponse toShortResponse(List<LessonVocab> lessonVocabs) {

        if (lessonVocabs.isEmpty()) {
            return new LessonVocabShortResponse();
        }

        String lessonName = lessonVocabs.get(0).getLesson().getName();

        List<VocabShortResponse> vocabResponses = lessonVocabs.stream()
                .map(lessonVocab -> {
                    VocabShortResponse vocab = new VocabShortResponse();
                    vocab.setId(lessonVocab.getVocab().getId());
                    vocab.setWord(lessonVocab.getVocab().getWord());
                    vocab.setImage(lessonVocab.getVocab().getImage());

                    return vocab;
                })
                .collect(Collectors.toList());

        LessonVocabShortResponse response = new LessonVocabShortResponse();
        response.setLessonName(lessonName);
        response.setVocabularies(vocabResponses);
        return response;
    }

    public LessonVocab toEntity(LessonVocabRequest request, Lesson lesson, Vocabulary vocab) {
        LessonVocab lessonVocab = new LessonVocab();
        lessonVocab.setLesson(lesson);
        lessonVocab.setVocab(vocab);
        return lessonVocab;
    }
}
