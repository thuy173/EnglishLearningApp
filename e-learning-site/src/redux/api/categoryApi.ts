import CategoryDto from "@/types/feature/Category";
import httpClient from "./agent";

interface FetchParams {
  name?: string;
  pageNumber: number;
  pageSize: number;
  sortField: string;
  sortDirection: string;
}

export const fetchData = async (
  name?: string,
  pageNumber: number = 0,
  pageSize: number = 20,
  sortField = "id",
  sortDirection = "ASC"
): Promise<CategoryDto[]> => {
  try {
    const params: FetchParams = {
      pageNumber,
      pageSize,
      sortField,
      sortDirection,
    };
    if (name) {
      params.name = name;
    }

    const response = await httpClient.get<{ content: CategoryDto[] }>("/categories", { params });
    return response.content;
  } catch (error) {
    throw new Error(`Failed to fetch category: ${error}`);
  }
};
export const fetchDataById = async (id: number): Promise<CategoryDto> => {
  try {
    const response = await httpClient.get<CategoryDto>(`/categories/${id}`);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch category: ${error}`);
  }
};
