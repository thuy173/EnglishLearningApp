package com.example.elearningapi.controller.site;

import com.example.elearningapi.beans.response.vocabulary.VocabularyResponse;
import com.example.elearningapi.enums.VocabStatus;
import com.example.elearningapi.service.VocabularyService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vocabularies")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class VocabularyController {
    private final VocabularyService vocabularyService;

    @GetMapping
    public ResponseEntity<Page<VocabularyResponse>> getAllVocabularies(
            @RequestParam(required = false) String word,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection) {

        Page<VocabularyResponse> vocabularies = vocabularyService.getAllData(
                word, VocabStatus.ACTIVE, pageNumber, pageSize, sortField, sortDirection);

        return ResponseEntity.ok(vocabularies);
    }

    @GetMapping("/{id}")
    public VocabularyResponse getVocabById(@PathVariable Long id) {
        return vocabularyService.getById(id);
    }
}
