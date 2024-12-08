package com.example.elearningapi.repository;

import com.example.elearningapi.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>, JpaSpecificationExecutor<Course> {
    @Query(value = "SELECT c.*, COUNT(uc.id) as enrollment_count FROM courses c " +
            "LEFT JOIN user_courses uc ON c.id = uc.course_id " +
            "GROUP BY c.id, c.name, c.description, c.created_at, c.updated_at " +
            "ORDER BY enrollment_count DESC",
            nativeQuery = true)
    Page<Course> findMostEnrolledCourses(Pageable pageable);

    @Query(value = "SELECT * FROM courses ORDER BY RAND() LIMIT :limit",
    nativeQuery = true)
    List<Course> findRandomCourses(@Param("limit") int limit);
}
