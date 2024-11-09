package com.example.elearningapi.beans.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LevelRequest {

    @NotBlank(message = "Level name is required")
    private String name;

    private String description;

    private Boolean status;
}
