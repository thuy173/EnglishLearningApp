package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.UserRequest;
import com.example.elearningapi.beans.request.UserUpdateRequest;
import com.example.elearningapi.beans.response.user.UserResponse;
import com.example.elearningapi.entity.Role;
import com.example.elearningapi.entity.User;
import com.example.elearningapi.exception.ConflictException;
import com.example.elearningapi.exception.EmptyException;
import com.example.elearningapi.mapper.UserMapper;
import com.example.elearningapi.repository.RoleRepository;
import com.example.elearningapi.repository.UserRepository;
import com.example.elearningapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Override
    public Page<UserResponse> getAllData(String name, Boolean status,  int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortDirection, sortField));
        Page<User> users;

        if (name != null && status != null) {
            users = userRepository.findByStatusAndFullNameContainingIgnoreCase(status, name, pageable);
        } else if (name != null) {
            users = userRepository.findByStatusAndFullNameContainingIgnoreCase(null, name, pageable);
        } else if (status != null) {
            users = userRepository.findByStatusAndFullNameContainingIgnoreCase(status,null,  pageable);
        } else {
            users = userRepository.findAll(pageable);
        }

        return users.map(userMapper::convertToResponse);
    }

    @Override
    public UserResponse createData(UserRequest userRequest) {
        if (userRepository.findByEmail(userRequest.getEmail()).isPresent())
            throw new ConflictException("Email already exists");

        User user = new User();
        userMapper.convertToRequest(user, userRequest);

        userRepository.save(user);
        return userMapper.convertToResponse(user);
    }

    @Override
    public UserResponse updateData(Long id, UserUpdateRequest userRequest) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EmptyException("User not found with id " + id));

        userMapper.convertToUpdateRequest(existingUser, userRequest);
        userRepository.save(existingUser);
        return userMapper.convertToResponse(existingUser);
    }

    @Override
    public void deleteOne(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EmptyException("User not found with id " + id));

        userRepository.delete(user);
    }

    @Override
    public void deleteMultiple(List<Long> ids) {
        List<User> users = userRepository.findAllById(ids);

        if (users.isEmpty()) {
            throw new EmptyException("No users found with the given ids");
        }

        userRepository.deleteAll(users);
    }
}
