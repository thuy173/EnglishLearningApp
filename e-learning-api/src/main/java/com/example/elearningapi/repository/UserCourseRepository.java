package com.example.elearningapi.repository;

import com.example.elearningapi.entity.UserCourse;
import com.example.elearningapi.enums.UserCourseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCourseRepository extends JpaRepository<UserCourse, Long> {
    @Query("SELECT uc FROM UserCourse uc " +
            "JOIN FETCH uc.user u " +
            "JOIN FETCH uc.course c " +
            "WHERE u.id = :userId AND c.id = :courseId")
    Optional<UserCourse> findUserCourseById(Long userId, Long courseId);

    List<UserCourse> findAllByCourseId(Long courseId);
}
