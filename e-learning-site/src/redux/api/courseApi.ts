import CourseDto, { CourseDetailDto } from "@/types/feature/Course";
import httpClient from "./agent";

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
  pageSize: number = 8,
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

    const response = await httpClient.get<{ content : CourseDto[] }>("/courses", { params });
    return response.content;
  } catch (error) {
    throw new Error(`Failed to fetch course: ${error}`);
  }
};
export const fetchDataById = async (id: number): Promise<CourseDetailDto> => {
  try {
    const response = await httpClient.get<CourseDetailDto>(`/courses/${id}`);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch course: ${error}`);
  }
};

export const fetchLatest = async (): Promise<CourseDto[]> => {
  try {
    const response = await httpClient.get<CourseDto[]>(`/courses/latest`);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch course latest: ${error}`);
  }
};
export const fetchMostEnrolled = async (): Promise<CourseDto[]> => {
  try {
    const response = await httpClient.get<CourseDto[]>(`/courses/most-enrolled`);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch course most enrolled: ${error}`);
  }
};
export const fetchRandom = async (): Promise<CourseDto[]> => {
  try {
    const response = await httpClient.get<CourseDto[]>(`/courses/random`);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch course random: ${error}`);
  }
};