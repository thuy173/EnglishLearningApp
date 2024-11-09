package com.example.elearningapi.beans.request;

import lombok.Data;

@Data
public class UserCourseRequest {
    private Long courseId;
    private Long userId;
}
