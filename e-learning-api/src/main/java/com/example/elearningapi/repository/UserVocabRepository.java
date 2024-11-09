package com.example.elearningapi.repository;

import com.example.elearningapi.entity.UserVocab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserVocabRepository extends JpaRepository<UserVocab, Long> {
    Optional<UserVocab> findByUserIdAndVocabId(Long userId, Long vocabId);
}
