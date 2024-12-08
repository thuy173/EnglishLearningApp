package com.example.elearningapi.specifications;

import com.example.elearningapi.entity.UserVocab;
import org.springframework.data.jpa.domain.Specification;

public class UserVocabSpecifications {
    public static Specification<UserVocab> hasUserId(Long userId){
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("user").get("id"), userId);
    }

    public static Specification<UserVocab> containsWord(String word){
        return (root, query, criteriaBuilder) ->{
            if(word == null || word.isEmpty()){
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("vocab").get("word")), "%"+word.toLowerCase()+"%");
        };
    }
}
