package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.CategoryRequest;
import com.example.elearningapi.beans.response.category.CategoryResponse;
import com.example.elearningapi.entity.Category;
import com.example.elearningapi.entity.Level;
import com.example.elearningapi.exception.EmptyException;
import com.example.elearningapi.mapper.CategoryMapper;
import com.example.elearningapi.repository.CategoryRepository;
import com.example.elearningapi.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public Page<CategoryResponse> getAllData(String name, Boolean status, int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortDirection, sortField));
        Page<Category> categories;

        if (name != null && status != null) {
            categories = categoryRepository.findByStatusAndNameContainingIgnoreCase(status, name, pageable);
        } else if (name != null) {
            categories = categoryRepository.findByNameContainingIgnoreCase(name, pageable);
        } else if (status != null) {
            categories = categoryRepository.findByStatus(status, pageable);
        } else {
            categories = categoryRepository.findAll(pageable);
        }

        return categories.map(categoryMapper::convertToResponse);
    }

    @Override
    public CategoryResponse getById(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Category not found " + id));

        return categoryMapper.convertToResponse(category);
    }

    @Override
    public CategoryResponse createData(CategoryRequest categoryRequest) {
        Category category = new Category();
        categoryMapper.convertToEntity(category, categoryRequest);
        categoryRepository.save(category);
        return categoryMapper.convertToResponse(category);
    }

    @Override
    public CategoryResponse updateData(Integer id, CategoryRequest categoryRequest) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Category not found with id " + id));

        categoryMapper.convertToEntity(existingCategory, categoryRequest);
        categoryRepository.save(existingCategory);
        return categoryMapper.convertToResponse(existingCategory);
    }

    @Override
    public void deleteOne(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Category not found with id " + id));

        categoryRepository.delete(category);
    }

    @Override
    public void deleteMultiple(List<Integer> ids) {
        List<Category> categories = categoryRepository.findAllById(ids);

        if (categories.isEmpty()) {
            throw new EmptyException("No categories found with the given ids");
        }

        categoryRepository.deleteAll(categories);
    }
}
