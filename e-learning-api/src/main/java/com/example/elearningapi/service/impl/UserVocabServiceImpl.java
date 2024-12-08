package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.response.user.UserDictionaryResponse;
import com.example.elearningapi.beans.response.vocabulary.VocabularyResponse;
import com.example.elearningapi.entity.User;
import com.example.elearningapi.entity.UserVocab;
import com.example.elearningapi.entity.Vocabulary;
import com.example.elearningapi.enums.UserVocabStatus;
import com.example.elearningapi.mapper.UserVocabMapper;
import com.example.elearningapi.repository.UserRepository;
import com.example.elearningapi.repository.UserVocabRepository;
import com.example.elearningapi.repository.VocabRepository;
import com.example.elearningapi.service.UserVocabService;
import com.example.elearningapi.specifications.UserVocabSpecifications;
import com.example.elearningapi.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserVocabServiceImpl implements UserVocabService {
    private final UserVocabRepository userVocabRepository;
    private final VocabRepository vocabRepository;
    private final UserRepository userRepository;
    private final SecurityUtils securityUtils;
    private final UserVocabMapper userVocabMapper;

    @Override
    public boolean evaluateVocabulary(Long vocabId, String word) {
        Long userId = securityUtils.getCurrentUserId();

        Vocabulary vocab = vocabRepository.findById(vocabId)
                .orElseThrow(() -> new RuntimeException("Vocabulary not found"));

        boolean isWordCorrect = vocab.getWord().trim().equalsIgnoreCase(word.trim());

        Optional<UserVocab> existingUserVocab = userVocabRepository.findByUserIdAndVocabId(userId, vocabId);

        if (existingUserVocab.isPresent()) {
            UserVocab userVocab = existingUserVocab.get();
            if (isWordCorrect) {
                userVocab.setCorrectCount(userVocab.getCorrectCount() + 1);
                updateVocabStatus(userVocab);
            } else {
                userVocab.setIncorrectCount(userVocab.getIncorrectCount() + 1);
            }
            userVocab.setReviewCount(userVocab.getReviewCount() + 1);
            userVocab.setLastReviewDate(LocalDateTime.now());
            userVocabRepository.save(userVocab);
        } else {
            UserVocabStatus initStatus = isWordCorrect ? UserVocabStatus.LEARNING : UserVocabStatus.NEW;
            addVocabularyToUser(vocabId, initStatus);
        }

        return isWordCorrect;
    }

    @Override
    public UserVocab addVocabularyToUser(Long vocabId, UserVocabStatus status) {
        Long userId = securityUtils.getCurrentUserId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Vocabulary vocab = vocabRepository.findById(vocabId)
                .orElseThrow(() -> new RuntimeException("Vocabulary not found"));

        Optional<UserVocab> existingUserVocab = userVocabRepository.findByUserIdAndVocabId(userId, vocabId);

        if (existingUserVocab.isPresent()) {
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

    @Override
    public Page<VocabularyResponse> getUserDictionary(String word, int pageNumber, int pageSize,
                                                          String sortField, Sort.Direction sortDirection) {

        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortDirection, sortField));

        Long userId = securityUtils.getCurrentUserId();

        Specification<UserVocab> spec = Specification.where(UserVocabSpecifications.hasUserId(userId))
                .and(UserVocabSpecifications.containsWord(word));

        Page<UserVocab> userVocabPage  = userVocabRepository.findAll(spec, pageable);

        return userVocabPage.map(userVocabMapper::toResponse);
    }

    private void updateVocabStatus(UserVocab userVocab) {
        if (userVocab.getCorrectCount() >= 10) {
            userVocab.setStatus(UserVocabStatus.MASTERED);
            userVocab.setMasteryLevel(100);
        } else if (userVocab.getCorrectCount() >= 5) {
            userVocab.setStatus(UserVocabStatus.LEARNING);
            userVocab.setMasteryLevel(50);
        }
        userVocab.setNextReviewDate(calculateNextReviewDate(userVocab.getStatus()));
    }

    private LocalDateTime calculateNextReviewDate(UserVocabStatus status) {
        LocalDateTime timeNow = LocalDateTime.now();

        return switch (status) {
            case NEW -> timeNow.plusDays(1);
            case LEARNING -> timeNow.plusDays(3);
            case MASTERED -> timeNow.plusDays(7);
        };
    }
}
