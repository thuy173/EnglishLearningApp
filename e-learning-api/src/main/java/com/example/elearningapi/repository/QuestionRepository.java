package com.example.elearningapi.repository;

import com.example.elearningapi.entity.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findByIdIn(List<String> questionIds);
}
