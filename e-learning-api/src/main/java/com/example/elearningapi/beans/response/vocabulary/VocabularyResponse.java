package com.example.elearningapi.beans.response.vocabulary;

import com.example.elearningapi.enums.VocabStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VocabularyResponse {
    private Long id;
    private String word;
    private String ipa;
    private String image;
    private String meaning;
    private String synonym;
    private String definition;
    private String example;
    private String collocation;
    private VocabStatus status;
    private Integer levelId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
