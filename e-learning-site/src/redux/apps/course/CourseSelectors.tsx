import { RootState } from "@/redux/store";

export const selectCourses = (state: RootState) => state.course.courses;

export const selectOneCourse = (state: RootState) => state.course.course;
