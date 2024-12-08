package com.example.elearningapi.beans.response.search;

import lombok.Data;

@Data
public class CourseSearchResponse {
    private Long id;
    private String name;
    private String description;
    private String highlightedName;
    private String highlightedDesc;
}
