package com.example.elearningapi.entity;

import com.example.elearningapi.enums.StudyActivityType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "user_study_logs")
public class UserStudyLogs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "study_date")
    private LocalDateTime studyDate;

    @Column(name = "study_duration_minutes")
    private Integer studyDurationMinutes;

    @Column(name = "activity_type")
    @Enumerated(EnumType.STRING)
    private StudyActivityType activityType;

    @Column(name = "activity_id")
    private Long activityId;
}
