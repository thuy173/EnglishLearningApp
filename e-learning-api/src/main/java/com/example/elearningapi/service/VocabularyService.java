package com.example.elearningapi.service;

import com.example.elearningapi.beans.request.vocab.ManyVocabRequest;
import com.example.elearningapi.beans.request.vocab.VocabularyRequest;
import com.example.elearningapi.beans.response.vocabulary.VocabularyResponse;
import com.example.elearningapi.enums.VocabStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VocabularyService {
    Page<VocabularyResponse> getAllData(String word, VocabStatus status, int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection);

    VocabularyResponse getById(Long id);

    void createData(VocabularyRequest vocabularyRequest);
    void createManyData(List<ManyVocabRequest> vocabularyRequests);

    VocabularyResponse updateData(Long id, VocabularyRequest vocabularyRequest);

    void deleteOne(Long id);

    void deleteMultiple(List<Long> ids);
}
