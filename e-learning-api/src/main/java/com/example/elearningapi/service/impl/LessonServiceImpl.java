package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.LessonRequest;
import com.example.elearningapi.beans.response.lesson.LessonResponse;
import com.example.elearningapi.beans.response.lesson.ShortLessonResponse;
import com.example.elearningapi.entity.Lesson;
import com.example.elearningapi.enums.LessonStatus;
import com.example.elearningapi.exception.EmptyException;
import com.example.elearningapi.mapper.LessonMapper;
import com.example.elearningapi.repository.LessonRepository;
import com.example.elearningapi.repository.UserVocabRepository;
import com.example.elearningapi.service.CourseProgressService;
import com.example.elearningapi.service.LessonService;
import com.example.elearningapi.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {
    private final LessonRepository lessonRepository;
    private final LessonMapper lessonMapper;
    private final CourseProgressService courseProgressService;
    private final SecurityUtils securityUtils;
    private final UserVocabRepository userVocabRepository;

    @Override
    public Page<ShortLessonResponse> getAllData(String name, Long courseId, LessonStatus status, int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortDirection, sortField));

        Long userId = securityUtils.getCurrentUserId();

        Specification<Lesson> spec = Specification.where(null);

        if (status != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }

        if (name != null && !name.trim().isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
        }

        if (courseId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("course").get("id"), courseId));
        }

        return lessonRepository.findAll(spec, pageable).map(lesson ->{
            ShortLessonResponse response = lessonMapper.convertToShortResponse(lesson);

            if(userId != null){
                int knownVocabCount = calculateKnownVocabularies(lesson, userId);
                response.setKnownVocabCount(knownVocabCount);
            }
            return response;
        });

    }

    @Override
    public LessonResponse getById(Long id) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Lesson not found " + id));

        return lessonMapper.convertToResponse(lesson);
    }

    @Override
    public LessonResponse createData(LessonRequest lessonRequest) {
        Lesson lesson = new Lesson();
        lessonMapper.convertToEntity(lesson, lessonRequest);
        lessonRepository.save(lesson);
        courseProgressService.handleNewLessonInCourse(lessonRequest.getCourseId(), lesson);
        return lessonMapper.convertToResponse(lesson);
    }

    @Override
    public LessonResponse updateData(Long id, LessonRequest lessonRequest) {
        Lesson existingLesson = lessonRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Lesson not found with id " + id));

        lessonMapper.convertToEntity(existingLesson, lessonRequest);
        lessonRepository.save(existingLesson);
        return lessonMapper.convertToResponse(existingLesson);
    }

    @Override
    public void deleteOne(Long id) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Lesson not found with id " + id));

        lessonRepository.delete(lesson);
    }

    @Override
    public void deleteMultiple(List<Long> ids) {
        List<Lesson> lessons = lessonRepository.findAllById(ids);

        if (lessons.isEmpty()) {
            throw new EmptyException("No lessons found with the given ids");
        }

        lessonRepository.deleteAll(lessons);
    }

    private int calculateKnownVocabularies(Lesson lesson, Long userId){
        Set<Long> lessonVocabIds = lesson.getLessonVocabs().stream()
                .map(lv->lv.getVocab().getId())
                .collect(Collectors.toSet());

        Set<Long> userVocabIds = userVocabRepository.findByUserId(userId).stream()
                .map(uv -> uv.getVocab().getId())
                .collect(Collectors.toSet());

        lessonVocabIds.retainAll(userVocabIds);
        return lessonVocabIds.size();
    }
}
