package com.example.elearningapi.beans.request.testing;

import lombok.Data;

import java.util.Map;

@Data
public class MediaRequest {
    private String type;
    private String url;
    private String altText;
    private Map<String, Object> metadata;
}
