package com.example.elearningapi.beans.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CourseEnrollRequest {
    @NotNull
    private Long courseId;

    @NotNull
    private Long userId;
}
