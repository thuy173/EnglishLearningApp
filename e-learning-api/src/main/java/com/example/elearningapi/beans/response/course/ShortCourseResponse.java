package com.example.elearningapi.beans.response.course;

import com.example.elearningapi.enums.CourseStatus;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ShortCourseResponse {
    private Long id;
    private String name;
    private String thumbnail;
    private String categoryName;
    private String levelName;
    private String description;
    private CourseStatus status;
    private Integer totalLessons;
    private Integer completedLessons;
}
