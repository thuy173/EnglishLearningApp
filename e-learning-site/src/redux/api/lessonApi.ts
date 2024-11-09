import LessonDto from "@/types/feature/Lesson";
import axiosInstance from "./agent";

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
  pageSize: number = 20,
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
    

    const response = await axiosInstance.get("/lessons", { params });
    return response.data.content;
  } catch (error) {
    throw new Error(`Failed to fetch course: ${error}`);
  }
};
export const fetchDataById = async (id: number): Promise<LessonDto> => {
  try {
    const response = await axiosInstance.get(`/lessons/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch course: ${error}`);
  }
};
