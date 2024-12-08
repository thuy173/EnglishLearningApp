package com.example.elearningapi.repository;

import com.example.elearningapi.entity.UserLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserLessonRepository extends JpaRepository<UserLesson, Long> {

    @Query("SELECT ul FROM UserLesson ul " +
            "WHERE ul.userCourse.user.id = :userId " +
            "AND ul.userCourse.course.id = :courseId")
    List<UserLesson> findUserLessonInCourse(@Param("userId") Long userId,
                                            @Param("courseId") Long courseId);

    @Query("SELECT ul FROM UserLesson ul " +
            "WHERE ul.userCourse.user.id = :userId " +
            "AND ul.lesson.id = :lessonId")
    List<UserLesson> findUserLessonByUserAndLesson(@Param("userId") Long userId,
                                                   @Param("lessonId") Long lessonId);

    @Query("SELECT COUNT(ul) FROM UserLesson ul " +
            "WHERE ul.userCourse.user.id = :userId " +
            "AND ul.userCourse.course.id = :courseId " +
            "AND ul.status = 'COMPLETED'")
    Integer countCompletedLessonInCourse(@Param("userId") Long userId,
                                         @Param("courseId") Long courseId);

    @Query("SELECT COUNT(ul.id) FROM UserLesson ul " +
            "JOIN ul.userCourse uc " +
            "WHERE uc.course.id = :courseId AND ul.status = 'COMPLETED'")
    Long countCompletedLessonsByCourseId(@Param("courseId") Long courseId);

}
