package com.example.elearningapi.service;

import com.example.elearningapi.entity.UserVocab;
import com.example.elearningapi.enums.UserVocabStatus;
import org.springframework.stereotype.Service;

@Service
public interface UserVocabService {

    boolean evaluateVocabulary(Long userId, Long vocabId, String word);

    UserVocab addVocabularyToUser(Long userId, Long VocabId, UserVocabStatus status);

}
