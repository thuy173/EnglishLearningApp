package com.example.elearningapi.controller.admin;

import com.example.elearningapi.beans.request.vocab.ManyVocabRequest;
import com.example.elearningapi.beans.request.vocab.VocabularyRequest;
import com.example.elearningapi.beans.response.vocabulary.VocabularyResponse;
import com.example.elearningapi.enums.VocabStatus;
import com.example.elearningapi.service.VocabularyService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/vocabularies")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class AdminVocabularyController {
    private final VocabularyService vocabularyService;

    @GetMapping
    public ResponseEntity<Page<VocabularyResponse>> getAllVocabularies(
            @RequestParam(required = false) String word,
            @RequestParam(required = false) VocabStatus status,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection) {

        Page<VocabularyResponse> vocabularies = vocabularyService.getAllData(
                word, status, pageNumber, pageSize, sortField, sortDirection);

        return ResponseEntity.ok(vocabularies);
    }

    @GetMapping("/{id}")
    public VocabularyResponse getVocabById(@PathVariable Long id) {
        return vocabularyService.getById(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> addVocab(@Valid @ModelAttribute VocabularyRequest vocabularyRequest) {
        vocabularyService.createData(vocabularyRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping(value = "/many")
    public ResponseEntity<Void> addManyVocab(@Valid @RequestBody List<ManyVocabRequest> vocabularyRequests) {
        vocabularyService.createManyData(vocabularyRequests);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<VocabularyResponse> updateVocab(@PathVariable Long id, @Valid @ModelAttribute VocabularyRequest vocabularyRequest) {
        VocabularyResponse updatedVocab = vocabularyService.updateData(id, vocabularyRequest);
        return ResponseEntity.ok().body(updatedVocab);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVocab(@PathVariable Long id) {
        vocabularyService.deleteOne(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultiple(@RequestBody List<Long> ids) {
        vocabularyService.deleteMultiple(ids);
        return ResponseEntity.ok("Vocabularies deleted successfully");
    }
}
