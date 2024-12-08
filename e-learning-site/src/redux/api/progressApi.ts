import ProgressDto, { LessonProgressRequest } from "@/types/feature/Progress";
import httpClient from "./agent";

export const progressEnroll = async (courseId: number): Promise<number> => {
  const response = await httpClient.post<{ id: number }>(`/progress/${courseId}/enroll`);
  return response.id;
};

export const progressLesson = async (request: LessonProgressRequest): Promise<void> => {
  const response = await httpClient.post<void>(`/progress/lesson/submit`, request);
  return response;
};

export const fetchProgressCourse = async (
  courseId: number
): Promise<ProgressDto> => {
  try {
    const response = await httpClient.get<ProgressDto>(`/progress/courses/${courseId}`);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch progress: ${error}`);
  }
};
