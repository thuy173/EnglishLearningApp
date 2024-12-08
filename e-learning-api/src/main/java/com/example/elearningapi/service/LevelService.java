package com.example.elearningapi.service;


import com.example.elearningapi.beans.request.LevelRequest;
import com.example.elearningapi.beans.response.LevelResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LevelService {

    Page<LevelResponse> getAllData(String name, int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection);

    LevelResponse getById(Integer id);

    LevelResponse createData(LevelRequest levelRequest);

    LevelResponse updateData(Integer id, LevelRequest levelRequest);

    void deleteOne(Integer id);

    void deleteMultiple(List<Integer> ids);
}
