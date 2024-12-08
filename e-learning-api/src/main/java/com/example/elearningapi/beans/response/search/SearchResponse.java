package com.example.elearningapi.beans.response.search;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchResponse {
    private List<CourseSearchResponse> courses;
    private List<VocabSearchResponse> vocabularies;
}
