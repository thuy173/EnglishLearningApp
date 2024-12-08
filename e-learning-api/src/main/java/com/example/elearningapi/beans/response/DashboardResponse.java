package com.example.elearningapi.beans.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    private Long totalCourses;
    private Long totalLessons;
    private Long totalUsers;
    private Long totalVocabularies;
}
