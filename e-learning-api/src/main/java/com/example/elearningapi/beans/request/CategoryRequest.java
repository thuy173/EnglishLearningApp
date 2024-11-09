package com.example.elearningapi.beans.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CategoryRequest {

    @NotBlank(message = "Name is required")
    private String name;

    private MultipartFile icon;

    private String description;

    private Boolean status;
}
