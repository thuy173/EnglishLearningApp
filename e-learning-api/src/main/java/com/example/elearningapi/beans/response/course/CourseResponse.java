package com.example.elearningapi.beans.response.course;

import com.example.elearningapi.enums.CourseStatus;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
public class CourseResponse {
    private Long id;
    private String name;
    private String description;
    private String audience;
    private String target;
    private String content;
    private String thumbnail;
    private Double price;
    private CourseStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
