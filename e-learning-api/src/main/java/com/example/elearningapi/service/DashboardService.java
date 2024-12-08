package com.example.elearningapi.service;

import com.example.elearningapi.beans.response.DashboardResponse;
import org.springframework.stereotype.Service;

@Service
public interface DashboardService {
    DashboardResponse getDashboard();
}
