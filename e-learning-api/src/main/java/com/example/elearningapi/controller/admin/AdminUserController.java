package com.example.elearningapi.controller.admin;

import com.example.elearningapi.beans.request.UserRequest;
import com.example.elearningapi.beans.request.UserUpdateRequest;
import com.example.elearningapi.beans.response.user.UserResponse;
import com.example.elearningapi.service.UserService;
import com.example.elearningapi.service.impl.UserDetailsServiceImpl;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class AdminUserController {
    private final UserService userService;
    private final UserDetailsServiceImpl userDetailsService;

    @GetMapping
    public ResponseEntity<Page<UserResponse>> getAllUsers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Boolean status,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection) {

        Page<UserResponse> Users = userService.getAllData(
                name, status, pageNumber, pageSize, sortField, sortDirection);

        return ResponseEntity.ok(Users);
    }

    @PostMapping()
    public ResponseEntity<UserResponse> addCategory(@Valid @RequestBody UserRequest userRequest) {
        UserResponse newUser = userService.createData(userRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<UserResponse> updateCategory(@PathVariable Long id, @Valid @ModelAttribute UserUpdateRequest userRequest) {
        UserResponse updatedCategory = userService.updateData(id, userRequest);
        return ResponseEntity.ok().body(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        userService.deleteOne(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultiple(@RequestBody List<Long> ids) {
        userService.deleteMultiple(ids);
        return ResponseEntity.ok("Users deleted successfully");
    }

    @GetMapping("/profile")
    public UserResponse getProfile(){
        return userDetailsService.getCurrentUserInformation();
    }
}
