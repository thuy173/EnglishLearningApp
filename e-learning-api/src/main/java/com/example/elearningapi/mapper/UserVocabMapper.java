package com.example.elearningapi.mapper;

import com.example.elearningapi.beans.response.user.UserDictionaryResponse;
import com.example.elearningapi.beans.response.vocabulary.VocabularyResponse;
import com.example.elearningapi.entity.UserVocab;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserVocabMapper {
    public VocabularyResponse toResponse(UserVocab userVocab) {

        VocabularyResponse vocab = new VocabularyResponse();
        vocab.setId(userVocab.getVocab().getId());
        vocab.setWord(userVocab.getVocab().getWord());
        vocab.setIpa(userVocab.getVocab().getIpa());
        vocab.setImage(userVocab.getVocab().getImage());
        vocab.setMeaning(userVocab.getVocab().getMeaning());
        vocab.setSynonym(userVocab.getVocab().getSynonym());
        vocab.setDefinition(userVocab.getVocab().getDefinition());
        vocab.setExample(userVocab.getVocab().getExample());
        vocab.setCollocation(userVocab.getVocab().getCollocations());
        return vocab;

    }
}
