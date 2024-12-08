package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.vocab.ManyVocabRequest;
import com.example.elearningapi.beans.request.vocab.VocabularyRequest;
import com.example.elearningapi.beans.response.vocabulary.IpaResponse;
import com.example.elearningapi.beans.response.vocabulary.VocabularyResponse;
import com.example.elearningapi.entity.Vocabulary;
import com.example.elearningapi.enums.VocabStatus;
import com.example.elearningapi.exception.EmptyException;
import com.example.elearningapi.mapper.VocabularyMapper;
import com.example.elearningapi.repository.VocabRepository;
import com.example.elearningapi.service.IpaService;
import com.example.elearningapi.service.VocabularyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VocabularyServiceImpl implements VocabularyService {
    private final VocabRepository vocabRepository;
    private final VocabularyMapper vocabularyMapper;
    private final IpaService ipaService;

    @Override
    public Page<VocabularyResponse> getAllData(String word, VocabStatus status, int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortDirection, sortField));

        Specification<Vocabulary> spec = Specification.where(null);

        if (status != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }

        if (word != null && !word.trim().isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("word")), "%" + word.toLowerCase() + "%"));
        }

        return vocabRepository.findAll(spec, pageable).map(vocabularyMapper::convertToResponse);
    }

    @Override
    public VocabularyResponse getById(Long id) {
        Vocabulary vocabulary = vocabRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Vocabulary not found " + id));

        return vocabularyMapper.convertToResponse(vocabulary);
    }

    @Override
    public void createData(VocabularyRequest vocabularyRequest) {
        Vocabulary vocabulary = new Vocabulary();

        IpaResponse ipaResponse = ipaService.getWordDefinition(vocabularyRequest.getWord());

        if(ipaResponse != null && ipaResponse.getPhonetic() != null){
            vocabularyRequest.setIpa(ipaResponse.getPhonetic());
        }

        vocabularyMapper.convertToEntity(vocabulary, vocabularyRequest);
        vocabRepository.save(vocabulary);
    }

    @Override
    public void createManyData(List<ManyVocabRequest> vocabularyRequests) {
        List<Vocabulary> vocabularies = new ArrayList<>();

        for (ManyVocabRequest vocabularyRequest : vocabularyRequests) {
            Vocabulary vocabulary = new Vocabulary();

            IpaResponse ipaResponse = ipaService.getWordDefinition(vocabularyRequest.getWord());

            if (ipaResponse != null && ipaResponse.getPhonetic() != null) {
                vocabularyRequest.setIpa(ipaResponse.getPhonetic());
            }

            vocabularyMapper.convertToManyReq(vocabulary, vocabularyRequest);
            vocabularies.add(vocabulary);
        }

        vocabRepository.saveAll(vocabularies);
    }

    @Override
    public VocabularyResponse updateData(Long id, VocabularyRequest vocabularyRequest) {
        Vocabulary existingVocab = vocabRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Course not found with id " + id));

        vocabularyMapper.convertToEntity(existingVocab, vocabularyRequest);
        vocabRepository.save(existingVocab);
        return vocabularyMapper.convertToResponse(existingVocab);
    }

    @Override
    public void deleteOne(Long id) {
        Vocabulary vocabulary = vocabRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Vocabulary not found with id " + id));

        vocabRepository.delete(vocabulary);
    }

    @Override
    public void deleteMultiple(List<Long> ids) {
        List<Vocabulary> vocabularies = vocabRepository.findAllById(ids);

        if (vocabularies.isEmpty()) {
            throw new EmptyException("No vocabularies found with the given ids");
        }

        vocabRepository.deleteAll(vocabularies);
    }
}
