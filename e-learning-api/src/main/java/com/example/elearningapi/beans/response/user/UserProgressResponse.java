package com.example.elearningapi.beans.response.user;

import com.example.elearningapi.beans.response.UserCourseResponse;
import com.example.elearningapi.beans.response.UserVocabResponse;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class UserProgressResponse {
    private UserCourseResponse courseProgress;
    private List<UserVocabResponse> vocabularies;
    private Map<String, Integer> statistics;
}
