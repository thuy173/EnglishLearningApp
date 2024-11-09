package com.example.elearningapi.mapper;

import com.example.elearningapi.beans.request.testing.MediaRequest;
import com.example.elearningapi.beans.request.testing.QuestionOptionRequest;
import com.example.elearningapi.beans.request.testing.QuestionRequest;
import com.example.elearningapi.beans.request.testing.QuizRequest;
import com.example.elearningapi.beans.response.testing.QuestionResponse;
import com.example.elearningapi.beans.response.testing.QuizResponse;
import com.example.elearningapi.entity.Media;
import com.example.elearningapi.entity.Question;
import com.example.elearningapi.entity.QuestionOption;
import com.example.elearningapi.entity.Quiz;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TestingMapper {
    Quiz toQuizEntity(QuizRequest request);

    QuizResponse toQuizResponse(Quiz entity);

    Question toQuestionEntity(QuestionRequest request);

    QuestionResponse toQuestionResponse(Question entity);

    QuestionOption toQuestionOptionEntity(QuestionOptionRequest request);

    Media toMediaEntity(MediaRequest request);

}
