package com.example.elearningapi.beans.request;

import com.example.elearningapi.enums.LessonStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class LessonRequest {

    @NotBlank(message = "Lesson name is required")
    private String name;

    private String description;

    private MultipartFile thumbnail;

    private LessonStatus status;

    @NotNull(message = "Course is required")
    private Long courseId;
}
