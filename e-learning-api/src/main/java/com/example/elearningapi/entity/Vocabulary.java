package com.example.elearningapi.entity;

import com.example.elearningapi.enums.VocabStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "vocabularies")
public class Vocabulary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "level_id")
    private Level level;

    private String word;
    private String ipa;

    @Column(columnDefinition = "LONGTEXT")
    private String image;

    private String meaning;

    @Column(columnDefinition = "LONGTEXT")
    private String synonym;

    @Column(columnDefinition = "LONGTEXT")
    private String definition;

    @Column(columnDefinition = "LONGTEXT")
    private String example;

    @Column(columnDefinition = "LONGTEXT")
    private String collocations;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VocabStatus status;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "vocab", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LessonVocab> lessonVocabs;

    @OneToMany(mappedBy = "vocab", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserVocab> userVocabs;
}
