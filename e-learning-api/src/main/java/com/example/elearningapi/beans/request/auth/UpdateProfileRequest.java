package com.example.elearningapi.beans.request.auth;

import com.example.elearningapi.enums.GenderStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
public class UpdateProfileRequest {
    @NotBlank(message = "Full name is required")
    private String fullName;

    private MultipartFile avatar;

    private GenderStatus gender;

    private LocalDateTime dob;

    private String phoneNumber;
}
