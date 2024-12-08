package com.example.elearningapi.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Data
@Document
public class Media {

    private String type;

    private String url;

    private String altText;

    private Map<String, Object> metadata;
}
