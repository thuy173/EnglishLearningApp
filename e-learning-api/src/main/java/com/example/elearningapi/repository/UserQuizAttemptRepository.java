package com.example.elearningapi.repository;

import com.example.elearningapi.entity.UserQuizAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserQuizAttemptRepository extends MongoRepository<UserQuizAttempt, String> {
    List<UserQuizAttempt> findByUserIdAndQuizId(Long userId, String quizId);

    Optional<UserQuizAttempt> findByUserIdAndQuizIdAndCompletedAtIsNull(Long userId, String quizId);
}
