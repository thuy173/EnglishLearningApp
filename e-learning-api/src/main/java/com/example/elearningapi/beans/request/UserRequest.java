package com.example.elearningapi.beans.request;

import com.example.elearningapi.enums.GenderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private String fullName;
    private String email;
    private GenderStatus gender;
    private LocalDate dob;
    private String phoneNumber;
}
