package com.example.elearningapi.mapper;

import com.example.elearningapi.beans.request.UserRequest;
import com.example.elearningapi.beans.request.UserUpdateRequest;
import com.example.elearningapi.beans.request.auth.UpdateProfileRequest;
import com.example.elearningapi.beans.response.user.UserResponse;
import com.example.elearningapi.entity.*;
import com.example.elearningapi.repository.RoleRepository;
import com.example.elearningapi.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final UploadService uploadService;
    private final RoleRepository roleRepository;

    public UserResponse convertToResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setFullName(user.getFullName());
        userResponse.setEmail(user.getEmail());
        userResponse.setPhone(user.getPhoneNumber());
        userResponse.setDob(user.getDob());
        userResponse.setGender(user.getGender());
        userResponse.setAvatar(user.getAvatar());
        userResponse.setStatus(user.getStatus());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());

        return userResponse;
    }

    public void convertToEntity(User user, UpdateProfileRequest request) {
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setGender(request.getGender());
        user.setDob(request.getDob());

        if (request.getAvatar() != null && !request.getAvatar().isEmpty()) {
            String uploadUrl = uploadService.uploadFile(request.getAvatar());
            user.setAvatar(uploadUrl);
        } else {
            user.setAvatar(user.getAvatar());
        }
    }

    public void convertToRequest(User user, UserRequest request) {
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setGender(request.getGender());
        user.setDob(request.getDob());
        user.setStatus(false);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        Role userRole = roleRepository.findByName("ROLE_TEACHER");

        if(userRole == null){
            userRole = new Role();
            userRole.setName("ROLE_TEACHER");
            userRole = roleRepository.save(userRole);
        }
        user.setRole(userRole);
    }

    public void convertToUpdateRequest(User user, UserUpdateRequest request) {
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setGender(request.getGender());
        user.setDob(request.getDob());
        user.setStatus(request.getStatus());
        user.setUpdatedAt(LocalDateTime.now());
    }
}
