import { RootState } from "@/redux/store";

export const selectCourses = (state: RootState) => state.course.courses;

export const selectOneCourse = (state: RootState) => state.course.course;

export const selectCourseLatest = (state: RootState) => state.course.courseLatest;

export const selectCourseMostEnroll = (state: RootState) => state.course.courseMostEnrolled;

export const selectCourseRandom = (state: RootState) => state.course.courseRandom;
