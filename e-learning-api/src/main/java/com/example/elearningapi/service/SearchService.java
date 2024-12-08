package com.example.elearningapi.service;

import com.example.elearningapi.beans.request.SearchRequest;
import com.example.elearningapi.beans.response.search.SearchResponse;
import org.springframework.stereotype.Service;

@Service
public interface SearchService {
    SearchResponse search(SearchRequest searchRequest);
}
