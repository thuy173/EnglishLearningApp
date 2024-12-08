package com.example.elearningapi.service;

import com.example.elearningapi.beans.request.UserRequest;
import com.example.elearningapi.beans.request.UserUpdateRequest;
import com.example.elearningapi.beans.response.user.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    Page<UserResponse> getAllData(String name, Boolean status, int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection);
    UserResponse createData(UserRequest userRequest);
    UserResponse updateData(Long id, UserUpdateRequest userRequest);
    void deleteOne(Long id);
    void deleteMultiple(List<Long> ids);
}
