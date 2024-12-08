package com.example.elearningapi.mapper;

import com.example.elearningapi.beans.request.vocab.ManyVocabRequest;
import com.example.elearningapi.beans.request.vocab.VocabularyRequest;
import com.example.elearningapi.beans.response.vocabulary.VocabularyResponse;
import com.example.elearningapi.entity.Level;
import com.example.elearningapi.entity.Vocabulary;
import com.example.elearningapi.exception.ResourceNotFoundException;
import com.example.elearningapi.repository.LevelRepository;
import com.example.elearningapi.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class VocabularyMapper {
    private final LevelRepository levelRepository;
    private final UploadService uploadService;

    public void convertToEntity(Vocabulary vocabulary, VocabularyRequest vocabularyRequest) {
        vocabulary.setWord(vocabularyRequest.getWord());
        vocabulary.setMeaning(vocabularyRequest.getMeaning());
        vocabulary.setSynonym(vocabularyRequest.getSynonym());
        vocabulary.setDefinition(vocabularyRequest.getDefinition());
        vocabulary.setExample(vocabularyRequest.getExample());
        vocabulary.setDefinition(vocabularyRequest.getDefinition());
        vocabulary.setCollocations(vocabularyRequest.getCollocation());
        vocabulary.setStatus(vocabularyRequest.getStatus());
        vocabulary.setCreatedAt(LocalDateTime.now());
        vocabulary.setUpdatedAt(LocalDateTime.now());

        if (vocabularyRequest.getImage() != null && !vocabularyRequest.getImage().isEmpty()) {
            String uploadUrl = uploadService.uploadFile(vocabularyRequest.getImage());
            vocabulary.setImage(uploadUrl);
        } else {
            vocabulary.setImage(vocabulary.getImage());
        }

        Level level = levelRepository.findById(vocabularyRequest.getLevelId())
                .orElseThrow(() -> new ResourceNotFoundException("Level not found"));

        vocabulary.setLevel(level);

        if (vocabularyRequest.getIpa() != null) {
            vocabulary.setIpa(vocabularyRequest.getIpa());
        }

    }

    public void convertToManyReq(Vocabulary vocabulary, ManyVocabRequest vocabularyRequest) {
        vocabulary.setWord(vocabularyRequest.getWord());
        vocabulary.setImage(vocabularyRequest.getImage());
        vocabulary.setMeaning(vocabularyRequest.getMeaning());
        vocabulary.setSynonym(vocabularyRequest.getSynonym());
        vocabulary.setDefinition(vocabularyRequest.getDefinition());
        vocabulary.setExample(vocabularyRequest.getExample());
        vocabulary.setDefinition(vocabularyRequest.getDefinition());
        vocabulary.setCollocations(vocabularyRequest.getCollocation());
        vocabulary.setStatus(vocabularyRequest.getStatus());
        vocabulary.setCreatedAt(LocalDateTime.now());
        vocabulary.setUpdatedAt(LocalDateTime.now());

        Level level = levelRepository.findById(vocabularyRequest.getLevelId())
                .orElseThrow(() -> new ResourceNotFoundException("Level not found"));

        vocabulary.setLevel(level);

        if (vocabularyRequest.getIpa() != null) {
            vocabulary.setIpa(vocabularyRequest.getIpa());
        }

    }

    public VocabularyResponse convertToResponse(Vocabulary vocabulary) {
        VocabularyResponse vocabularyResponse = new VocabularyResponse();
        vocabularyResponse.setId(vocabulary.getId());
        vocabularyResponse.setWord(vocabulary.getWord());
        vocabularyResponse.setIpa(vocabulary.getIpa());
        vocabularyResponse.setImage(vocabulary.getImage());
        vocabularyResponse.setMeaning(vocabulary.getMeaning());
        vocabularyResponse.setSynonym(vocabulary.getSynonym());
        vocabularyResponse.setDefinition(vocabulary.getDefinition());
        vocabularyResponse.setExample(vocabulary.getExample());
        vocabularyResponse.setCollocation(vocabulary.getCollocations());
        vocabularyResponse.setStatus(vocabulary.getStatus());
        vocabularyResponse.setLevelId(vocabulary.getLevel().getId());
        vocabularyResponse.setCreatedAt(vocabulary.getCreatedAt());
        vocabularyResponse.setUpdatedAt(vocabulary.getUpdatedAt());
        return vocabularyResponse;
    }

}
