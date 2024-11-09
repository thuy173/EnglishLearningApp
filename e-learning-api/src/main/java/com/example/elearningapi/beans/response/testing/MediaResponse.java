package com.example.elearningapi.beans.response.testing;

import lombok.Data;

import java.util.Map;

@Data
public class MediaResponse {
    private String type;
    private String url;
    private String altText;
    private Map<String, Object> metadata;
}
