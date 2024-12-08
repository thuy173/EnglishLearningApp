package com.example.elearningapi.beans.request;

import com.example.elearningapi.enums.GenderStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    @NotBlank(message = "Full name is required")
    private String fullName;

    private GenderStatus gender;
    private LocalDate dob;
    private String phoneNumber;
    private Boolean status;
}
