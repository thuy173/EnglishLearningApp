import LessonDto from "@/types/feature/Lesson";
import httpClient from "./agent";

interface FetchParams {
  name?: string;
  courseId: number;
  pageNumber: number;
  pageSize: number;
  sortField: string;
  sortDirection: string;
}

export const fetchData = async (
  name?: string,
  courseId: number = 1,
  pageNumber: number = 0,
  pageSize: number = 100,
  sortField = "id",
  sortDirection = "ASC"
): Promise<LessonDto[]> => {
  try {
    const params: FetchParams = {
      courseId,
      pageNumber,
      pageSize,
      sortField,
      sortDirection,
    };
    if (name) {
      params.name = name;
    }
    

    const response = await httpClient.get<{ content : LessonDto[] }>("/lessons", { params });
    return response.content;
  } catch (error) {
    throw new Error(`Failed to fetch lesson: ${error}`);
  }
};
export const fetchDataById = async (id: number): Promise<LessonDto> => {
  try {
    const response = await httpClient.get<LessonDto>(`/lessons/${id}`);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch lesson: ${error}`);
  }
};
