package com.example.elearningapi.controller.site;

import com.example.elearningapi.beans.response.LevelResponse;
import com.example.elearningapi.service.LevelService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/levels")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class LevelController {
    private final LevelService levelService;

    @GetMapping
    public ResponseEntity<Page<LevelResponse>> getAllLevels(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection) {

        Page<LevelResponse> levels = levelService.getAllData(
                name, pageNumber, pageSize, sortField, sortDirection);

        return ResponseEntity.ok(levels);
    }
}
