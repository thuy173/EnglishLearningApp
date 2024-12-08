package com.example.elearningapi.beans.request.auth;

import com.example.elearningapi.enums.GenderStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
public class UpdateProfileRequest {
    @NotBlank(message = "Full name is required")
    private String fullName;

    private MultipartFile avatar;

    private GenderStatus gender;

    private LocalDate dob;

    private String phoneNumber;
}
