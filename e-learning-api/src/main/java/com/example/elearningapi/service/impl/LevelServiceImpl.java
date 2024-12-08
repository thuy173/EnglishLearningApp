package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.LevelRequest;
import com.example.elearningapi.beans.response.LevelResponse;
import com.example.elearningapi.entity.Category;
import com.example.elearningapi.entity.Level;
import com.example.elearningapi.exception.EmptyException;
import com.example.elearningapi.mapper.LevelMapper;
import com.example.elearningapi.repository.LevelRepository;
import com.example.elearningapi.service.LevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LevelServiceImpl implements LevelService {
    private final LevelRepository levelRepository;
    private final LevelMapper levelMapper;

    @Override
    public Page<LevelResponse> getAllData(String name, int pageNumber, int pageSize, String sortField, Sort.Direction sortDirection) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortDirection, sortField));
        Page<Level> categories = levelRepository.findAll(pageable);

        return categories.map(levelMapper::convertToResponse);
    }

    @Override
    public LevelResponse getById(Integer id) {
        Level level = levelRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Category not found " + id));

        return levelMapper.convertToResponse(level);
    }

    @Override
    public LevelResponse createData(LevelRequest levelRequest) {
        Level level = new Level();
        levelMapper.convertToEntity(level, levelRequest);
        levelRepository.save(level);
        return levelMapper.convertToResponse(level);
    }

    @Override
    public LevelResponse updateData(Integer id, LevelRequest levelRequest) {
        Level existingLevel = levelRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Level not found with id " + id));

        levelMapper.convertToEntity(existingLevel, levelRequest);
        levelRepository.save(existingLevel);
        return levelMapper.convertToResponse(existingLevel);
    }

    @Override
    public void deleteOne(Integer id) {
        Level level = levelRepository.findById(id)
                .orElseThrow(() -> new EmptyException("Level not found with id " + id));

        levelRepository.delete(level);
    }

    @Override
    public void deleteMultiple(List<Integer> ids) {
        List<Level> levels = levelRepository.findAllById(ids);

        if (levels.isEmpty()) {
            throw new EmptyException("No levels found with the given ids");
        }

        levelRepository.deleteAll(levels);
    }
}
