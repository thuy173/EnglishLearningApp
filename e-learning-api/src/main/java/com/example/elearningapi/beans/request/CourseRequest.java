package com.example.elearningapi.beans.request;

import com.example.elearningapi.enums.CourseStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CourseRequest {

    @NotBlank(message = "Course name is required")
    private String name;

    private String description;

    private String audience;

    private String target;

    private String content;

    private MultipartFile thumbnail;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Price must be greater than 0")
    private Double price;

    private CourseStatus status;

    @NotNull(message = "Category is required")
    private Integer categoryId;

    @NotNull(message = "Level is required")
    private Integer levelId;
}
