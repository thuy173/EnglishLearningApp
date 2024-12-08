package com.example.elearningapi.beans.request.vocab;

import com.example.elearningapi.enums.VocabStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class VocabularyRequest {

    @NotBlank(message = "Word is required")
    private String word;

    private String ipa;

    private MultipartFile image;

    private String meaning;

    private String synonym;

    private String definition;

    private String example;

    private String collocation;

    private VocabStatus status;

    @NotNull(message = "Level is required")
    private Integer levelId;
}
