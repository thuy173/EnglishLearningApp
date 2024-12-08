package com.example.elearningapi.service;

import com.example.elearningapi.beans.request.LessonRequest;
import com.example.elearningapi.beans.response.lesson.LessonResponse;
import com.example.elearningapi.beans.response.lesson.ShortLessonResponse;
import com.example.elearningapi.enums.LessonStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LessonService {

    Page<ShortLessonResponse> getAllData(String name, Long courseId, LessonStatus status, int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection);

    LessonResponse getById(Long id);

    LessonResponse createData(LessonRequest lessonRequest);

    LessonResponse updateData(Long id, LessonRequest lessonRequest);

    void deleteOne(Long id);

    void deleteMultiple(List<Long> ids);
}
