package com.example.elearningapi.repository;

import com.example.elearningapi.entity.UserVocab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserVocabRepository extends JpaRepository<UserVocab, Long>, JpaSpecificationExecutor<UserVocab> {
    Optional<UserVocab> findByUserIdAndVocabId(Long userId, Long vocabId);
    List<UserVocab> findByUserId(Long userId);

    @Query("SELECT uv FROM UserVocab uv WHERE uv.user.id = :userId AND uv.vocab.id IN :vocabIds")
    List<UserVocab> findByUserIdAndVocabIds(@Param("userId") Long userId, @Param("vocabIds") List<Long> vocabIds);
}
