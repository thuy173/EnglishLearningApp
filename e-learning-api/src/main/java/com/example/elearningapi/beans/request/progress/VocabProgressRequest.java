package com.example.elearningapi.beans.request.progress;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VocabProgressRequest {
    private Long vocabId;
    private Boolean isCorrect;
}
