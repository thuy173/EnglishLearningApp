package com.example.elearningapi.entity;

import lombok.Data;

import java.util.Map;

@Data
public class Media {

    private String type;

    private String url;

    private String altText;

    private Map<String, Object> metadata;
}
