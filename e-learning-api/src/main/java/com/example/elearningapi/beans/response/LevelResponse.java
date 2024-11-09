package com.example.elearningapi.beans.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LevelResponse {
    private Integer id;
    private String name;
    private String description;
    private Boolean status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
