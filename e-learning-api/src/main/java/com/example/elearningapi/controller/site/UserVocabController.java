package com.example.elearningapi.controller.site;

import com.example.elearningapi.beans.response.user.UserDictionaryResponse;
import com.example.elearningapi.beans.response.vocabulary.VocabularyResponse;
import com.example.elearningapi.entity.UserVocab;
import com.example.elearningapi.enums.UserVocabStatus;
import com.example.elearningapi.service.UserVocabService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user-vocab")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class UserVocabController {
    private final UserVocabService userVocabService;

    @PostMapping("/{vocabId}")
    public ResponseEntity<Void> addVocabularyToUser(@PathVariable Long vocabId, UserVocabStatus status) {
        userVocabService.addVocabularyToUser( vocabId, status);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{vocabId}/evaluate")
    public ResponseEntity<?> evaluateVocabulary(@PathVariable Long vocabId, String word) {
        boolean isCorrect = userVocabService.evaluateVocabulary( vocabId, word);

        return ResponseEntity.ok(isCorrect ? "Correct!" : "Incorrect, try again.");
    }

    @GetMapping
    public ResponseEntity<Page<VocabularyResponse>> getVocabUser(
            @RequestParam(required = false) String word,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection
    ){
        Page<VocabularyResponse> vocabPage  = userVocabService.getUserDictionary(
                word, pageNumber, pageSize, sortField, sortDirection);
        return ResponseEntity.ok(vocabPage );
    }
}
