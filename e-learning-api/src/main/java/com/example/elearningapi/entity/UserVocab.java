package com.example.elearningapi.entity;

import com.example.elearningapi.enums.UserVocabStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_vocabs")
public class UserVocab {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "vocab_id")
    private Vocabulary vocab;

    @Enumerated(EnumType.STRING)
    private UserVocabStatus status;

    @Column(name = "mastery_level")
    private Integer masteryLevel = 0;

    @Column(name = "last_review_date")
    private LocalDateTime lastReviewDate;

    @Column(name = "next_review_date")
    private LocalDateTime nextReviewDate;

    @Column(name = "review_count")
    private Integer reviewCount = 0;

    @Column(name = "correct_count")
    private Integer correctCount = 0;

    @Column(name = "incorrect_count")
    private Integer incorrectCount = 0;

}
