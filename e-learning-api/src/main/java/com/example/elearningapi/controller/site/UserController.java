package com.example.elearningapi.controller.site;

import com.example.elearningapi.beans.request.CourseRequest;
import com.example.elearningapi.beans.request.auth.UpdateProfileRequest;
import com.example.elearningapi.beans.response.category.CategoryResponse;
import com.example.elearningapi.beans.response.user.UserResponse;
import com.example.elearningapi.service.impl.UserDetailsServiceImpl;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/information")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class UserController {
    private final UserDetailsServiceImpl userDetailsService;

    @GetMapping
    public UserResponse getUserInformation() {
        return userDetailsService.getCurrentUserInformation();
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserResponse> updateUser( @Valid @ModelAttribute UpdateProfileRequest request) {
        UserResponse userUpdate = userDetailsService.updateData( request);
        return ResponseEntity.ok(userUpdate);
    }
}
