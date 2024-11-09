package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.LessonVocabRequest;
import com.example.elearningapi.beans.response.lesson.LessonVocabResponse;
import com.example.elearningapi.beans.response.lesson.LessonVocabShortResponse;
import com.example.elearningapi.entity.Lesson;
import com.example.elearningapi.entity.LessonVocab;
import com.example.elearningapi.entity.Vocabulary;
import com.example.elearningapi.exception.ResourceNotFoundException;
import com.example.elearningapi.mapper.LessonVocabMapper;
import com.example.elearningapi.repository.LessonRepository;
import com.example.elearningapi.repository.LessonVocabRepository;
import com.example.elearningapi.repository.VocabRepository;
import com.example.elearningapi.service.LessonVocabService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonVocabServiceImpl implements LessonVocabService {
    private final LessonRepository lessonRepository;
    private final VocabRepository vocabRepository;
    private final LessonVocabRepository lessonVocabRepository;
    private final LessonVocabMapper lessonVocabMapper;

    @Override
    public LessonVocabResponse getVocabByLessonId(Long lessonId) {
        List<LessonVocab> lessonVocabs = lessonVocabRepository.findByLessonId(lessonId);
        return lessonVocabMapper.toResponse(lessonVocabs);
    }

    @Override
    public LessonVocabShortResponse getVocabShortByLessonId(Long lessonId) {
        List<LessonVocab> lessonVocabs = lessonVocabRepository.findByLessonId(lessonId);
        return lessonVocabMapper.toShortResponse(lessonVocabs);
    }

    @Override
    public void addVocabToLesson(LessonVocabRequest request) {
        Lesson lesson = findLessonById(request.getLessonId());
        List<Vocabulary> vocabularies = vocabRepository.findAllById(request.getVocabIds());

        if(vocabularies.size() != request.getVocabIds().size()) {
            Set<Long> foundIds = vocabularies.stream()
                    .map(Vocabulary::getId)
                    .collect(Collectors.toSet());

            List<Long> missingIds = request.getVocabIds().stream()
                    .filter(id -> !foundIds.contains(id))
                    .collect(Collectors.toList());

            throw new ResourceNotFoundException("Could not find vocabularies with IDs: " + missingIds);
        }

        List<LessonVocab> existingRelations = lessonVocabRepository
                .findByLessonIdAndVocabIdIn(lesson.getId(), request.getVocabIds());

        Set<Long> existingVocabIds = existingRelations.stream()
                .map(lv -> lv.getVocab().getId())
                        .collect(Collectors.toSet());

        List<LessonVocab> newRelations = vocabularies.stream()
                .filter(vocab -> !existingVocabIds.contains(vocab.getId()))
                .map(vocab ->{
                    LessonVocab newVocab = new LessonVocab();
                    newVocab.setLesson(lesson);
                    newVocab.setVocab(vocab);
                    return newVocab;
                })
                .collect(Collectors.toList());

        if(!newRelations.isEmpty()){
            lessonVocabRepository.saveAll(newRelations);
        }

    }

    @Override
    public void deleteVocabsFromLesson(Long lessonId, List<Long> vocabIds) {
        Lesson lesson = findLessonById(lessonId);

        List<LessonVocab> existingRelations = lessonVocabRepository
                .findByLessonIdAndVocabIdIn(lesson.getId(), vocabIds);

        if(existingRelations.size() != vocabIds.size()) {
            Set<Long> existingVocabIds = existingRelations.stream()
                    .map(lv -> lv.getVocab().getId())
                    .collect(Collectors.toSet());
            List<Long> notFoundIds = vocabIds.stream()
                    .filter(id -> !existingVocabIds.contains(id))
                    .collect(Collectors.toList());
            throw new ResourceNotFoundException("Could not find vocabularies with IDs: " + notFoundIds);
        }

        lessonVocabRepository.deleteAll(existingRelations);
    }

    private Lesson findLessonById(Long lessonId) {
        return lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + lessonId));
    }

    private Vocabulary findVocabById(Long vocabId) {
        return vocabRepository.findById(vocabId)
                .orElseThrow(() -> new ResourceNotFoundException("Vocabulary not found with id: " + vocabId));
    }
}
