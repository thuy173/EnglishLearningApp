package com.example.elearningapi.beans.response.user;

import com.example.elearningapi.beans.response.vocabulary.VocabularyResponse;
import lombok.Data;

import java.util.List;

@Data
public class UserDictionaryResponse {
    private List<VocabularyResponse> vocabularies;
}
