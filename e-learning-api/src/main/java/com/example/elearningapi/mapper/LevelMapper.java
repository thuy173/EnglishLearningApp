package com.example.elearningapi.mapper;

import com.example.elearningapi.beans.request.LevelRequest;
import com.example.elearningapi.beans.response.LevelResponse;
import com.example.elearningapi.entity.Level;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class LevelMapper {

    public void convertToEntity(Level level, LevelRequest levelRequest) {
        level.setName(levelRequest.getName());
        level.setDescription(levelRequest.getDescription());
        level.setStatus(levelRequest.getStatus());
        level.setCreatedAt(LocalDateTime.now());
        level.setUpdatedAt(LocalDateTime.now());

    }

    public LevelResponse convertToResponse(Level level) {
        LevelResponse levelResponse = new LevelResponse();
        levelResponse.setId(level.getId());
        levelResponse.setName(level.getName());
        levelResponse.setDescription(level.getDescription());
        levelResponse.setStatus(level.getStatus());
        levelResponse.setCreatedAt(level.getCreatedAt());
        levelResponse.setUpdatedAt(level.getUpdatedAt());
        return levelResponse;
    }

}
