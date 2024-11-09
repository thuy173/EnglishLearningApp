package com.example.elearningapi.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "user_lesson_attempts")
public class UserLessonAttempts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_lesson_id")
    private UserLesson userLesson;

    @Column(name = "attempt_date")
    private LocalDateTime attemptDate;

    @Column(name = "score")
    private Integer score;

    @Column(name = "time_spent")
    private Integer timeSpent;

    @Column(name = "mistakes_made")
    private Integer mistakesMade;
}
