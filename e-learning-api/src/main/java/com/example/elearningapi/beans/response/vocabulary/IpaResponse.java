package com.example.elearningapi.beans.response.vocabulary;

import lombok.Data;

import java.util.List;

@Data
public class IpaResponse {
    private String word;
    private String phonetic;
    private List<Phonetics> phonetics;
    private List<Meaning> meanings;

    @Data
    public static class Phonetics {
        private String text;
        private String audio;
    }

    @Data
    public static class Meaning {
        private String partOfSpeech;
        private List<Definition> definitions;
    }

    @Data
    public static class Definition {
        private String definition;
        private String example;
    }
}


