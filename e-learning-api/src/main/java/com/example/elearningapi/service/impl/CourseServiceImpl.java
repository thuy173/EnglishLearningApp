package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.CourseRequest;
import com.example.elearningapi.beans.response.course.CourseResponse;
import com.example.elearningapi.beans.response.course.ShortCourseResponse;
import com.example.elearningapi.entity.Course;
import com.example.elearningapi.enums.CourseStatus;
import com.example.elearningapi.exception.EmptyException;
import com.example.elearningapi.mapper.CourseMapper;
import com.example.elearningapi.repository.CourseRepository;
import com.example.elearningapi.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    @Override
    public Page<ShortCourseResponse> getAllData(String name, CourseStatus status, Integer categoryId, Integer levelId,
                                                int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortDirection, sortField));

        Specification<Course> spec = Specification.where(null);

        if (status != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }

        if (name != null && !name.trim().isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
        }

        if (categoryId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("category").get("id"), categoryId));
        }

        if (levelId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("level").get("id"), levelId));
        }

        return courseRepository.findAll(spec, pageable).map(courseMapper::convertToShortResponse);
    }

    @Override
    public CourseResponse getById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Course not found " + id));

        return courseMapper.convertToResponse(course);
    }

    @Override
    public void createData(CourseRequest courseRequest) {
        Course course = new Course();
        courseMapper.convertToEntity(course, courseRequest);
        courseRepository.save(course);
    }

    @Override
    public void updateData(Long id, CourseRequest courseRequest) {
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Course not found with id " + id));

        courseMapper.convertToEntity(existingCourse, courseRequest);
        courseRepository.save(existingCourse);
    }

    @Override
    public void deleteOne(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Course not found with id " + id));

        courseRepository.delete(course);
    }

    @Override
    public void deleteMultiple(List<Long> ids) {
        List<Course> courses = courseRepository.findAllById(ids);

        if (courses.isEmpty()) {
            throw new EmptyException("No courses found with the given ids");
        }

        courseRepository.deleteAll(courses);
    }
}
