import CourseDto, { CourseDetailDto } from "@/types/feature/Course";
import axiosInstance from "./agent";

interface FetchParams {
  name?: string;
  categoryId: number;
  levelId?: number;
  pageNumber: number;
  pageSize: number;
  sortField: string;
  sortDirection: string;
}

export const fetchData = async (
  name?: string,
  categoryId: number = 1,
  levelId?: number,
  pageNumber: number = 0,
  pageSize: number = 20,
  sortField = "id",
  sortDirection = "ASC"
): Promise<CourseDto[]> => {
  try {
    const params: FetchParams = {
      categoryId,
      pageNumber,
      pageSize,
      sortField,
      sortDirection,
    };
    if (name) {
      params.name = name;
    }
    if (levelId) {
      params.levelId = levelId;
    }

    const response = await axiosInstance.get("/courses", { params });
    return response.data.content;
  } catch (error) {
    throw new Error(`Failed to fetch course: ${error}`);
  }
};
export const fetchDataById = async (id: number): Promise<CourseDetailDto> => {
  try {
    const response = await axiosInstance.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch course: ${error}`);
  }
};
