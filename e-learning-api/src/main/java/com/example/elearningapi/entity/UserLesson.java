package com.example.elearningapi.entity;

import com.example.elearningapi.enums.UserLessonStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "user_lessons")
public class UserLesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_course_id")
    private UserCourse userCourse;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "completed_date")
    private LocalDateTime completedDate;

    @Enumerated(EnumType.STRING)
    private UserLessonStatus status = UserLessonStatus.NOT_STARTED;

    private Integer score;

    @Column(name = "time_spent")
    private Integer timeSpent;
}
