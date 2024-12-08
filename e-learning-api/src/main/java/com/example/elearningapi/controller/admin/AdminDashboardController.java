package com.example.elearningapi.controller.admin;

import com.example.elearningapi.beans.response.DashboardResponse;
import com.example.elearningapi.service.DashboardService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class AdminDashboardController {
    private final DashboardService dashboardService;

    @GetMapping
    public DashboardResponse adminDashboard() {
        return dashboardService.getDashboard();
    }

}
