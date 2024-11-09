package com.example.elearningapi.beans.response.user;

import com.example.elearningapi.enums.GenderStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponse {
    private Long id;
    private String fullName;
    private String avatar;
    private String email;
    private String phone;
    private GenderStatus gender;
    private LocalDateTime dob;
    private Boolean status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
