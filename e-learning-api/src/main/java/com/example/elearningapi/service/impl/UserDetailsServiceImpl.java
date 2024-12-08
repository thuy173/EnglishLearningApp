package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.auth.UpdateProfileRequest;
import com.example.elearningapi.beans.response.user.UserResponse;
import com.example.elearningapi.entity.User;
import com.example.elearningapi.exception.EmptyException;
import com.example.elearningapi.exception.ResourceNotFoundException;
import com.example.elearningapi.mapper.UserMapper;
import com.example.elearningapi.repository.UserRepository;
import com.example.elearningapi.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final SecurityUtils securityUtils;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email not found"));
    }

    public UserResponse getUserInformation(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return userMapper.convertToResponse(user);
    }

    public UserResponse getCurrentUserInformation() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return userMapper.convertToResponse(user);
    }

    public UserResponse updateData(UpdateProfileRequest request) {
        Long userId = securityUtils.getCurrentUserId();
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new EmptyException("User not found with id " + userId));

        userMapper.convertToEntity(existingUser, request);
        userRepository.save(existingUser);

        return userMapper.convertToResponse(existingUser);
    }
}
