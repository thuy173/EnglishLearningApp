package com.example.elearningapi.beans.response.search;

import lombok.Data;

@Data
public class VocabSearchResponse {
    private Long id;
    private String word;
    private String meaning;
    private String highlightedWord;
    private String highlightedMeaning;
}
