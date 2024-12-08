package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.SearchRequest;
import com.example.elearningapi.beans.response.search.SearchResponse;
import com.example.elearningapi.entity.Course;
import com.example.elearningapi.entity.Vocabulary;
import com.example.elearningapi.mapper.CourseMapper;
import com.example.elearningapi.mapper.SearchMapper;
import com.example.elearningapi.mapper.VocabularyMapper;
import com.example.elearningapi.repository.CourseRepository;
import com.example.elearningapi.repository.VocabRepository;
import com.example.elearningapi.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {
    private final CourseRepository courseRepository;
    private final VocabRepository vocabRepository;
    private final SearchMapper searchMapper;

    @Override
    @Cacheable(value = "searchResults", key = "#request.keyword + #request.page + #request.size")
    public SearchResponse search(SearchRequest request) {
        Specification<Course> courseSpec = (root, query, cb) -> {
            String keyword = "%" + request.getKeyword().toLowerCase().trim() + "%";
            return cb.or(
                    cb.equal(cb.lower(root.get("name")), request.getKeyword().toLowerCase()),
                    cb.like(cb.lower(root.get("name")), keyword + "%"),
                    cb.like(cb.lower(root.get("name")), keyword),
                    cb.like(cb.lower(root.get("description")), keyword)
            );
        };

        Specification<Vocabulary> vocabSpec = (root, query, cb) -> {
            String keyword = "%" + request.getKeyword().toLowerCase() + "%";
            return cb.or(
                    cb.equal(cb.lower(root.get("word")), request.getKeyword().toLowerCase()),
                    cb.like(cb.lower(root.get("word")), keyword + "%"),
                    cb.like(cb.lower(root.get("word")), keyword),
                    cb.like(cb.lower(root.get("meaning")), keyword)
            );
        };

        CompletableFuture<Page<Course>> courseFuture = CompletableFuture
                .supplyAsync(() -> courseRepository.findAll(courseSpec,
                        PageRequest.of(request.getPage(), request.getSize())));

        CompletableFuture<Page<Vocabulary>> vocabFuture = CompletableFuture
                .supplyAsync(() -> vocabRepository.findAll(vocabSpec,
                        PageRequest.of(request.getPage(), request.getSize())));

        try {
            CompletableFuture.allOf(courseFuture, vocabFuture).join();

            SearchResponse response = new SearchResponse(
                    courseFuture.get().map(searchMapper::convertToCourseResponse).getContent(),
                    vocabFuture.get().map(searchMapper::convertToVocabResponse).getContent()
            );

            highlightSearchResult(response, request.getKeyword());

            return response;
        } catch (Exception e) {
            throw new RuntimeException("Error performing search", e);
        }
    }

    private void highlightSearchResult(SearchResponse response, String keyword) {
        String[] keywords = keyword.toLowerCase().split("\\s+");

        response.getCourses().forEach(course -> {
            String highlightedName = highlightText(course.getName(), keywords);
            String highlightedDesc = highlightText(course.getDescription(), keywords);
            course.setHighlightedName(highlightedName);
            course.setHighlightedDesc(highlightedDesc);
        });

        response.getVocabularies().forEach(vocab -> {
            String highlightedWord = highlightText(vocab.getWord(), keywords);
            String highlightedMeaning = highlightText(vocab.getMeaning(), keywords);
            vocab.setHighlightedWord(highlightedWord);
            vocab.setHighlightedMeaning(highlightedMeaning);
        });

    }

    private String highlightText(String text, String[] keywords) {
        if (text == null) return null;

        String result = text;

        for (String keyword : keywords) {
            result = result.replaceAll(
                    "(?i)(" + Pattern.quote(keyword) + ")",
                    "<mark>$1</mark>"
            );
        }
        return result;
    }

}
