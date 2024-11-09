package com.example.elearningapi.mapper;

import com.example.elearningapi.beans.request.CategoryRequest;
import com.example.elearningapi.beans.response.category.CategoryResponse;
import com.example.elearningapi.beans.response.category.ShortCategoryResponse;
import com.example.elearningapi.entity.Category;
import com.example.elearningapi.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class CategoryMapper {

    private final UploadService uploadService;

    public void convertToEntity(Category category, CategoryRequest categoryRequest) {
        category.setName(categoryRequest.getName());
        category.setDescription(categoryRequest.getDescription());
        category.setStatus(categoryRequest.getStatus());
        category.setCreatedAt(LocalDateTime.now());
        category.setUpdatedAt(LocalDateTime.now());

        if (categoryRequest.getIcon() != null && !categoryRequest.getIcon().isEmpty()) {
            String uploadUrl = uploadService.uploadFile(categoryRequest.getIcon());
            category.setIcon(uploadUrl);
        } else {
            category.setIcon(category.getIcon());
        }

    }

    public CategoryResponse convertToResponse(Category category) {
        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setId(category.getId());
        categoryResponse.setName(category.getName());
        categoryResponse.setIcon(category.getIcon());
        categoryResponse.setDescription(category.getDescription());
        categoryResponse.setStatus(category.getStatus());
        categoryResponse.setCreatedAt(category.getCreatedAt());
        categoryResponse.setUpdatedAt(category.getUpdatedAt());
        return categoryResponse;
    }

    public ShortCategoryResponse convertToShortResponse(Category category) {
        ShortCategoryResponse shortCategoryResponse = new ShortCategoryResponse();
        shortCategoryResponse.setId(category.getId());
        shortCategoryResponse.setName(category.getName());
        shortCategoryResponse.setStatus(category.getStatus());
        return shortCategoryResponse;
    }
}
