package com.example.elearningapi.controller.admin;

import com.example.elearningapi.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/upload")
@RequiredArgsConstructor
public class AdminUploadController {
    private final UploadService uploadService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadFile(@RequestPart("file") MultipartFile file) {
        String uploadUrl = uploadService.uploadFile(file);
        return ResponseEntity.status(HttpStatus.CREATED).body(uploadUrl);
    }

}
