package com.example.elearningapi.controller.site;

import com.example.elearningapi.beans.request.SearchRequest;
import com.example.elearningapi.beans.response.search.SearchResponse;
import com.example.elearningapi.service.SearchService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class SearchController {
    private final SearchService searchService;

    @PostMapping
    public ResponseEntity<SearchResponse> search(@RequestBody SearchRequest searchRequest) {
        return ResponseEntity.ok(searchService.search(searchRequest));
    }
}
