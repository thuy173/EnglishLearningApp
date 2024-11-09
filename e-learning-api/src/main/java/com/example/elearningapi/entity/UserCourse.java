package com.example.elearningapi.entity;

import com.example.elearningapi.enums.UserCourseStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "user_courses")
public class UserCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "enroll_date", updatable = false)
    private LocalDateTime enrollDate;

    @Column(name = "last_access_date")
    private LocalDateTime lastAccessDate;

    @Column(name = "completed_date")
    private LocalDateTime completedDate;

    @Enumerated(EnumType.STRING)
    private UserCourseStatus status = UserCourseStatus.IN_PROGRESS;

    @Column(name = "progress_percentage")
    private Integer progressPercentage = 0;

    @OneToMany(mappedBy = "userCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserLesson> userLessons;

}
