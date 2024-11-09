package com.example.elearningapi.service.impl;

import com.example.elearningapi.entity.User;
import com.example.elearningapi.entity.UserVocab;
import com.example.elearningapi.entity.Vocabulary;
import com.example.elearningapi.enums.UserVocabStatus;
import com.example.elearningapi.repository.UserLessonRepository;
import com.example.elearningapi.repository.UserRepository;
import com.example.elearningapi.repository.UserVocabRepository;
import com.example.elearningapi.repository.VocabRepository;
import com.example.elearningapi.service.UserVocabService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserVocabServiceImpl implements UserVocabService {
    private final UserVocabRepository userVocabRepository;
    private final VocabRepository vocabRepository;
    private final UserRepository userRepository;

    @Override
    public boolean evaluateVocabulary(Long userId, Long vocabId, String word) {
        Vocabulary vocab = vocabRepository.findById(vocabId)
                .orElseThrow(() -> new RuntimeException("Vocabulary not found"));

        boolean isWordCorrect = vocab.getWord().equalsIgnoreCase(word);

        if(isWordCorrect) {
            markVocabAsLearned(userId, vocabId);
        }

        return isWordCorrect;
    }

    @Override
    public UserVocab addVocabularyToUser(Long userId, Long vocabId, UserVocabStatus status) {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new RuntimeException("User not found"));

        Vocabulary vocab = vocabRepository.findById(vocabId)
                .orElseThrow(() -> new RuntimeException("Vocabulary not found"));

        Optional<UserVocab> existingUserVocab = userVocabRepository.findByUserIdAndVocabId(userId, vocabId);

        if(existingUserVocab.isPresent()){
            throw new RuntimeException("This vocabulary is already assigned to user");
        }

        UserVocab userVocab = new UserVocab();
        userVocab.setUser(user);
        userVocab.setVocab(vocab);
        userVocab.setStatus(status);
        userVocab.setMasteryLevel(0);
        userVocab.setReviewCount(0);
        userVocab.setCorrectCount(0);
        userVocab.setIncorrectCount(0);
        userVocab.setLastReviewDate(LocalDateTime.now());
        userVocab.setNextReviewDate(calculateNextReviewDate(status));

        return userVocabRepository.save(userVocab);
    }

    private void markVocabAsLearned(Long userId, Long vocabId) {
        Optional<UserVocab> optionalUserVocab = userVocabRepository.findByUserIdAndVocabId(userId, vocabId);

        if (optionalUserVocab.isPresent()) {
            UserVocab userVocab = optionalUserVocab.get();
            userVocab.setStatus(UserVocabStatus.LEARNED);
            userVocabRepository.save(userVocab);
        } else {
            throw new RuntimeException("UserVocab not found for the specified user and vocabulary ID.");
        }
    }

    private LocalDateTime calculateNextReviewDate (UserVocabStatus status){
        LocalDateTime timeNow = LocalDateTime.now();

        return switch (status){
            case NEW -> timeNow.plusDays(1);
            case LEARNED -> timeNow.plusDays(3);
            case MASTERED -> timeNow.plusDays(7);
        };
    }
}
