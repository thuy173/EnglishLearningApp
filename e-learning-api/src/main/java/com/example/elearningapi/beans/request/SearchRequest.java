package com.example.elearningapi.beans.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchRequest {
    private String keyword;
    private Integer page = 0;
    private Integer size = 10;
}
