package com.example.elearningapi.service;

import com.example.elearningapi.beans.request.CategoryRequest;
import com.example.elearningapi.beans.response.category.CategoryResponse;
import com.example.elearningapi.beans.response.category.ShortCategoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {

    Page<CategoryResponse> getAllData(String name, Boolean status, int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection);

    CategoryResponse getById(Integer id);

    CategoryResponse createData(CategoryRequest categoryRequest);

    CategoryResponse updateData(Integer id, CategoryRequest categoryRequest);

    void deleteOne(Integer id);

    void deleteMultiple(List<Integer> ids);
}
