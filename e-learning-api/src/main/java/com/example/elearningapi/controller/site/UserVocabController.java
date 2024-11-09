package com.example.elearningapi.controller.site;

import com.example.elearningapi.entity.UserVocab;
import com.example.elearningapi.enums.UserVocabStatus;
import com.example.elearningapi.service.UserVocabService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user-vocab")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class UserVocabController {
    private final UserVocabService userVocabService;

    @PostMapping
    public ResponseEntity<UserVocab> addVocabularyToUser(@RequestBody Long userId, Long vocabId, UserVocabStatus status) {
        UserVocab userVocab = userVocabService.addVocabularyToUser(userId, vocabId, status);
        return ResponseEntity.ok(userVocab);
    }

    @PostMapping("/evaluate")
    public ResponseEntity<?> evaluateVocabulary(@RequestBody Long userId, Long vocabId, String word) {
        boolean isCorrect = userVocabService.evaluateVocabulary(userId, vocabId, word);

        return ResponseEntity.ok(isCorrect ? "Correct!" : "Incorrect, try again.");
    }
}
