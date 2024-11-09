package com.example.elearningapi.controller.admin;

import com.example.elearningapi.beans.request.LevelRequest;
import com.example.elearningapi.beans.response.LevelResponse;
import com.example.elearningapi.service.LevelService;
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
@RequestMapping("/api/admin/levels")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class AdminLevelController {
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

    @GetMapping("/{id}")
    public LevelResponse getLevelById(@PathVariable Integer id) {
        return levelService.getById(id);
    }

    @PostMapping
    public ResponseEntity<Void> addLevel(@Valid @RequestBody LevelRequest levelRequest) {
        levelService.createData(levelRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateLevel(@PathVariable Integer id, @Valid @RequestBody LevelRequest levelRequest) {
        levelService.updateData(id, levelRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLevel(@PathVariable Integer id) {
        levelService.deleteOne(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultiple(@RequestBody List<Integer> ids) {
        levelService.deleteMultiple(ids);
        return ResponseEntity.ok("Levels deleted successfully");
    }
}
