package com.example.elearningapi.beans.request;

import lombok.Data;

@Data
public class UserVocabRequest {
    private Long userId;
    private Long vocabId;
}
