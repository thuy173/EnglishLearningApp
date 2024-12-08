import LevelDto from "@/types/feature/Level";
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
): Promise<LevelDto[]> => {
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

    const response = await httpClient.get<{ content : LevelDto[] }>("/levels", { params });
    return response.content;
  } catch (error) {
    throw new Error(`Failed to fetch level: ${error}`);
  }
};

