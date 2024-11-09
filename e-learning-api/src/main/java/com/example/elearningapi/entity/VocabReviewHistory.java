package com.example.elearningapi.entity;

import com.example.elearningapi.enums.VocabReviewType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "vocab_review_history")
public class VocabReviewHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_vocab_id")
    private UserVocab userVocab;

    @Column(name = "review_date")
    private LocalDateTime reviewDate;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    @Column(name = "response_time_ms")
    private Long responseTimeMs;

    @Column(name = "review_type")
    @Enumerated(EnumType.STRING)
    private VocabReviewType reviewType;
}
