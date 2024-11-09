package com.example.elearningapi.repository;

import com.example.elearningapi.entity.UserLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserLessonRepository extends JpaRepository<UserLesson, Long> {
    @Query("SELECT DISTINCT DATE(ul.completedDate) as date, " +
            "SUM(ul.timeSpent) as totalMinutes " +
            "FROM UserLesson ul " +
            "WHERE ul.userCourse.user.id = :userId " +
            "AND ul.completedDate >= :startDate " +
            "GROUp BY DATE(ul.completedDate)")
    List<Object[]> findLearningTimeByDayAndUser(
            @Param("userId" ) Long userId,
            @Param("startDate") LocalDateTime startDate
    );

    @Query("SELECT ul.completedDate " +
            "FROM UserLesson ul " +
            "WHERE ul.userCourse.user.id = :userId " +
            "AND ul.status = 'COMPLETED' " +
            "GROUP BY ul.completedDate " +
            "ORDER BY ul.completedDate DESC")
    List<LocalDateTime> findLearningDaysByUserId(@Param("userId") Long userId);



    @Query("SELECT ul FROM UserLesson ul " +
            "WHERE ul.lesson.id = :lessonId " +
            "AND ul.userCourse.user.id = :userId")
    Optional<UserLesson> findByLessonIdAndUserCourseUserId(Long lessonId, Long userId);

    @Query("SELECT ul FROM UserLesson ul " +
            "WHERE ul.userCourse.id = :userCourseId")
    List<UserLesson> findByUserCourseId(Long userCourseId);

    Optional<UserLesson> findByUserCourse_IdAndLesson_Id(Long userCourseId, Long lessonId);

}
