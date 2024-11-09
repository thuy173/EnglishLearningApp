package com.example.elearningapi.repository;

import com.example.elearningapi.entity.Category;
import com.example.elearningapi.entity.Course;
import com.example.elearningapi.enums.CourseStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Page<Category> findByStatusAndNameContainingIgnoreCase(Boolean status, String name, Pageable pageable);
    Page<Category> findByNameContainingIgnoreCase(String name, Pageable pageable);
    Page<Category> findByStatus(Boolean status, Pageable pageable);
}
