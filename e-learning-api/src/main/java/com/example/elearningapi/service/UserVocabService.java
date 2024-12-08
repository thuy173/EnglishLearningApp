package com.example.elearningapi.service;

import com.example.elearningapi.beans.response.vocabulary.VocabularyResponse;
import com.example.elearningapi.entity.UserVocab;
import com.example.elearningapi.enums.UserVocabStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public interface UserVocabService {

    boolean evaluateVocabulary( Long vocabId, String word);

    UserVocab addVocabularyToUser(Long VocabId, UserVocabStatus status);

    Page<VocabularyResponse> getUserDictionary(String word, int pageNumber, int pageSize,
                                               String sortField, Sort.Direction sortDirection);
}
