package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.progress.UserLearningProgressRequest;
import com.example.elearningapi.beans.request.progress.VocabProgressRequest;
import com.example.elearningapi.beans.response.UserCourseResponse;
import com.example.elearningapi.beans.response.progress.LessonProgressResponse;
import com.example.elearningapi.beans.response.progress.UserLearningProgressResponse;
import com.example.elearningapi.entity.*;
import com.example.elearningapi.enums.UserCourseStatus;
import com.example.elearningapi.enums.UserLessonStatus;
import com.example.elearningapi.enums.UserVocabStatus;
import com.example.elearningapi.exception.DuplicateException;
import com.example.elearningapi.exception.ResourceNotFoundException;
import com.example.elearningapi.mapper.ProgressMapper;
import com.example.elearningapi.mapper.UserCourseMapper;
import com.example.elearningapi.repository.*;
import com.example.elearningapi.service.CourseProgressService;
import com.example.elearningapi.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseProgressServiceImpl implements CourseProgressService {
    private final UserCourseRepository userCourseRepository;
    private final UserLessonRepository userLessonRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final UserCourseMapper userCourseMapper;
    private final SecurityUtils securityUtils;
    private final UserVocabRepository userVocabRepository;
    private final ProgressMapper progressMapper;
    private final VocabRepository vocabRepository;

    @Override
    public UserCourseResponse enrollCourse(Long courseId) {
        Long userId = securityUtils.getCurrentUserId();

        return userCourseRepository.findUserCourseById(userId, courseId)
                .map(userCourseMapper::toUserCourseResponse)
                .orElseGet(() -> {
                    UserCourse userCourse = new UserCourse();
                    userCourse.setUser(userRepository.getReferenceById(userId));
                    userCourse.setCourse(courseRepository.getReferenceById(courseId));
                    userCourse.setEnrollDate(LocalDateTime.now());
                    userCourse.setStatus(UserCourseStatus.ENROLLED);

                    userCourse = userCourseRepository.save(userCourse);

                    initializeAllLessons(userCourse);

                    return userCourseMapper.toUserCourseResponse(userCourse);

                });

    }

    @Override
    public UserLearningProgressResponse submitLessonProgress(UserLearningProgressRequest request) {
        Long userId = securityUtils.getCurrentUserId();

        UserCourse userCourse = userCourseRepository.findUserCourseById(userId, request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("User course not found"));

        boolean lessonBelongsToCourse = userCourse.getCourse().getLessons().stream()
                .anyMatch(lesson -> lesson.getId().equals(request.getLessonId()));

        if (!lessonBelongsToCourse) {
            throw new IllegalArgumentException("Lesson does not belong to the specified course");
        }

        UserLesson userLesson = userCourse.getUserLessons().stream()
                .filter(ul -> ul.getLesson().getId().equals(request.getLessonId()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("User lesson not found"));

        userLesson.setStartDate(request.getStartDate());
        userLesson.setCompletedDate(request.getCompletedDate());
        userLesson.setScore(request.getScore());
        userLesson.setTimeSpent(request.getTimeSpent());
        userLesson.setStatus(UserLessonStatus.COMPLETED);

        for (VocabProgressRequest vocabProgress : request.getVocabProgress()) {
            processVocabProgress(userId, vocabProgress);
        }

        updateCourseProgress(userLesson.getUserCourse());

        return getCourseProgress(request.getCourseId());
    }

    @Override
    public UserLearningProgressResponse getCourseProgress(Long courseId) {
        Long userId = securityUtils.getCurrentUserId();

        List<UserLesson> userLessons = userLessonRepository
                .findUserLessonInCourse(userId, courseId);

        List<LessonProgressResponse> lessonProgress = userLessons.stream()
                .map(progressMapper::mapToLessonProgressDetail)
                .collect(Collectors.toList());

        UserCourse userCourse = userCourseRepository
                .findUserCourseById(userId, courseId)
                .orElseThrow(() -> new ResourceNotFoundException("User course not found"));

        return UserLearningProgressResponse.builder()
                .courseId(courseId)
                .courseName(userCourse.getCourse().getName())
                .totalLessons(userLessons.size())
                .completedLessons((int) userLessons.stream()
                        .filter(ul -> ul.getStatus() == UserLessonStatus.COMPLETED)
                        .count())
                .progressPercentage(userCourse.getProgressPercentage().doubleValue())
                .lessonProgress(lessonProgress)
                .build();
    }

    private void initializeAllLessons(UserCourse userCourse) {
        List<Lesson> lessons = userCourse.getCourse().getLessons();
        for (Lesson lesson : lessons) {
            initializeLesson(userCourse, lesson);
        }
    }

    @Override
    @Transactional
    public void handleNewLessonInCourse(Long courseId, Lesson newLesson) {
        List<UserCourse> enrolledCourses = userCourseRepository.findAllByCourseId(courseId);

        for (UserCourse userCourse : enrolledCourses) {
            if (!userLessonExists(userCourse, newLesson)) {
                initializeLesson(userCourse, newLesson);
                updateCourseProgress(userCourse);
            }
        }
    }

    private UserLesson initializeLesson(UserCourse userCourse, Lesson lesson) {
        UserLesson userLesson = new UserLesson();
        userLesson.setUserCourse(userCourse);
        userLesson.setLesson(lesson);
        userLesson.setStartDate(LocalDateTime.now());
        userLesson.setStatus(UserLessonStatus.NOT_STARTED);
        return userLessonRepository.save(userLesson);
    }

    private boolean userLessonExists(UserCourse userCourse, Lesson lesson) {
        return userCourse.getUserLessons().stream()
                .anyMatch(ul -> ul.getLesson().getId().equals(lesson.getId()));
    }


    private void processVocabProgress(Long userId, VocabProgressRequest vocabProgress) {
        UserVocab userVocab = userVocabRepository
                .findByUserIdAndVocabId(userId, vocabProgress.getVocabId())
                .orElseGet(() -> createNewUserVocab(userId, vocabProgress.getVocabId()));

        // Update vocab statistics
        userVocab.setReviewCount(userVocab.getReviewCount() + 1);
        if (vocabProgress.getIsCorrect()) {
            userVocab.setCorrectCount(userVocab.getCorrectCount() + 1);
            userVocab.setMasteryLevel(calculateMasteryLevel(userVocab));
        } else {
            userVocab.setIncorrectCount(userVocab.getIncorrectCount() + 1);
        }

        userVocab.setLastReviewDate(LocalDateTime.now());
        userVocab.setNextReviewDate(calculateNextReviewDate(userVocab));
        userVocabRepository.save(userVocab);
    }

    private void updateCourseProgress(UserCourse userCourse) {
        Integer completedLessons = userLessonRepository
                .countCompletedLessonInCourse(
                        userCourse.getUser().getId(),
                        userCourse.getCourse().getId()
                );

        List<UserLesson> allLessons = userLessonRepository
                .findUserLessonInCourse(
                        userCourse.getUser().getId(),
                        userCourse.getCourse().getId()
                );
        Integer totalLessons = allLessons.size();

        Integer progressPercentage = totalLessons > 0
                ? (completedLessons * 100) / totalLessons
                : 0;

        userCourse.setProgressPercentage(progressPercentage);
        userCourse.setLastAccessDate(LocalDateTime.now());

        if (progressPercentage == 100) {
            userCourse.setStatus(UserCourseStatus.COMPLETED);
            userCourse.setCompletedDate(LocalDateTime.now());
        }

        userCourseRepository.save(userCourse);
    }

    private UserVocab createNewUserVocab(Long userId, Long vocabId) {
        return UserVocab.builder()
                .user(userRepository.getReferenceById(userId))
                .vocab(vocabRepository.getReferenceById(vocabId))
                .status(UserVocabStatus.LEARNING)
                .masteryLevel(0)
                .reviewCount(0)
                .correctCount(0)
                .incorrectCount(0)
                .build();
    }

    private Integer calculateMasteryLevel(UserVocab userVocab) {
        double correctRate = (double) userVocab.getCorrectCount() / userVocab.getReviewCount();
        if (correctRate >= 0.9 && userVocab.getReviewCount() >= 5) {
            return Math.min(userVocab.getMasteryLevel() + 1, 5);
        }
        return userVocab.getMasteryLevel();
    }

    private LocalDateTime calculateNextReviewDate(UserVocab userVocab) {
        // Implement spaced repetition algorithm based on mastery level
        int daysUntilNextReview = switch (userVocab.getMasteryLevel()) {
            case 0 -> 1;
            case 1 -> 3;
            case 2 -> 7;
            case 3 -> 14;
            case 4 -> 30;
            case 5 -> 90;
            default -> 1;
        };

        return LocalDateTime.now().plusDays(daysUntilNextReview);
    }
}
