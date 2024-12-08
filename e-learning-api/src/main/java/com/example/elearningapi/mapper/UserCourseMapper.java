package com.example.elearningapi.mapper;

import com.example.elearningapi.beans.response.UserCourseResponse;
import com.example.elearningapi.beans.response.UserLessonResponse;
import com.example.elearningapi.entity.UserCourse;
import com.example.elearningapi.entity.UserLesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserCourseMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userName", source = "user.email")
    @Mapping(target = "courseId", source = "course.id")
    @Mapping(target = "courseName", source = "course.name")
    UserCourseResponse toUserCourseResponse(UserCourse userCourse);

    @Mapping(target = "lessonId", source = "userLesson.lesson.id")
    @Mapping(target = "lessonTitle", source = "userLesson.lesson.name")
    UserLessonResponse toUserLessonResponse(UserLesson userLesson);

    List<UserCourseResponse> toUserCourseResponseList(List<UserCourse> userCourseList);
}
