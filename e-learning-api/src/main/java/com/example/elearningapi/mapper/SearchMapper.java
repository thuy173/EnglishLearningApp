package com.example.elearningapi.mapper;

import com.example.elearningapi.beans.response.search.CourseSearchResponse;
import com.example.elearningapi.beans.response.search.VocabSearchResponse;
import com.example.elearningapi.entity.Course;
import com.example.elearningapi.entity.Vocabulary;
import org.springframework.stereotype.Component;

@Component
public class SearchMapper {
    public VocabSearchResponse convertToVocabResponse(Vocabulary vocabulary) {
        VocabSearchResponse response = new VocabSearchResponse();
        response.setId(vocabulary.getId());
        response.setWord(vocabulary.getWord());
        response.setMeaning(vocabulary.getMeaning());
        return response;
    }

    public CourseSearchResponse convertToCourseResponse(Course course) {
        CourseSearchResponse response = new CourseSearchResponse();
        response.setId(course.getId());
        response.setName(course.getName());
        response.setDescription(course.getDescription());
        return response;
    }


}
