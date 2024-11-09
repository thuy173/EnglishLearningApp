package com.example.elearningapi.mapper;

import com.example.elearningapi.beans.request.CourseRequest;
import com.example.elearningapi.beans.request.auth.UpdateProfileRequest;
import com.example.elearningapi.beans.response.course.CourseResponse;
import com.example.elearningapi.beans.response.user.UserResponse;
import com.example.elearningapi.entity.Category;
import com.example.elearningapi.entity.Course;
import com.example.elearningapi.entity.Level;
import com.example.elearningapi.entity.User;
import com.example.elearningapi.exception.ResourceNotFoundException;
import com.example.elearningapi.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final UploadService uploadService;

    public UserResponse convertToResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setFullName(user.getFullName());
        userResponse.setEmail(user.getEmail());
        userResponse.setPhone(user.getPhoneNumber());
        userResponse.setDob(user.getDob());
        userResponse.setGender(user.getGender());
        userResponse.setAvatar(user.getAvatar());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());

        return userResponse;
    }

    public void convertToEntity(User user, UpdateProfileRequest request) {
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setDob(request.getDob());

        if (request.getAvatar() != null && !request.getAvatar().isEmpty()) {
            String uploadUrl = uploadService.uploadFile(request.getAvatar());
            user.setAvatar(uploadUrl);
        } else {
            user.setAvatar(user.getAvatar());
        }

    }
}
