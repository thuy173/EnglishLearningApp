import { RootState } from "@/redux/store";

export const selectLessons = (state: RootState) => state.lesson.lessons;

export const selectOneLesson = (state: RootState) => state.lesson.lesson;
