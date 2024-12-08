package com.example.elearningapi.service;

import com.example.elearningapi.beans.request.CourseRequest;
import com.example.elearningapi.beans.response.course.CourseResponse;
import com.example.elearningapi.beans.response.course.ShortCourseResponse;
import com.example.elearningapi.enums.CourseStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CourseService {

    Page<ShortCourseResponse> getAllData(String name, CourseStatus status, Integer categoryId, Integer levelId,
                                         int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection);

    CourseResponse getById(Long id);

    List<ShortCourseResponse> getLatestCourses();

    List<ShortCourseResponse> getMostEnrolledCourses();

    List<ShortCourseResponse> getRandomCourses();

    void createData(CourseRequest courseRequest);

    void updateData(Long id, CourseRequest courseRequest);

    void deleteOne(Long id);

    void deleteMultiple(List<Long> ids);

}
