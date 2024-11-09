package com.example.elearningapi.service;

import com.example.elearningapi.beans.response.vocabulary.IpaResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IpaService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public IpaResponse getWordDefinition(String word) {
        String url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            JsonNode root = objectMapper.readTree(response.getBody());

            JsonNode firstEntry = root.get(0);
            IpaResponse wordDto = new IpaResponse();
            wordDto.setWord(firstEntry.get("word").asText());
            wordDto.setPhonetic(firstEntry.get("phonetic").asText());

            List<IpaResponse.Phonetics> phoneticsList = new ArrayList<>();
            for (JsonNode phoneticNode : firstEntry.get("phonetics")) {
                IpaResponse.Phonetics phonetics = new IpaResponse.Phonetics();
                if (phoneticNode.has("text")) {
                    phonetics.setText(phoneticNode.get("text").asText());
                }
                if (phoneticNode.has("audio")) {
                    phonetics.setAudio(phoneticNode.get("audio").asText());
                }
                phoneticsList.add(phonetics);
            }
            wordDto.setPhonetics(phoneticsList);

            List<IpaResponse.Meaning> meaningList = new ArrayList<>();
            for (JsonNode meaningNode : firstEntry.get("meanings")) {
                IpaResponse.Meaning meanings = new IpaResponse.Meaning();
                meanings.setPartOfSpeech(meaningNode.get("partOfSpeech").asText());

                List<IpaResponse.Definition> definitionList = new ArrayList<>();
                for (JsonNode definitionNode : meaningNode.get("definitions")) {
                    IpaResponse.Definition definition = new IpaResponse.Definition();
                    definition.setDefinition(definitionNode.get("definition").asText());
                    if (definitionNode.has("example")) {
                        definition.setExample(definitionNode.get("example").asText());
                    }
                    definitionList.add(definition);
                }
                meanings.setDefinitions(definitionList);
                meaningList.add(meanings);
            }
            wordDto.setMeanings(meaningList);

            return wordDto;
        } catch (Exception e) {
            return null;
        }
    }
}
