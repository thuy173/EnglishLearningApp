import { FetchUserVocabProps, VocabDetailDto } from "@/types/feature/Vocab";
import UserDetailInfoDto from "@/types/feature/User";
import httpClient from "./agent";
import { PaginationResponse } from "@/types/feature/Quiz";

export const fetchData = async (): Promise<UserDetailInfoDto> => {
  try {
    const response = await httpClient.get<UserDetailInfoDto>(`/information`);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch user information: ${error}`);
  }
};

export const fetchDictionaryData = async (
  word?: string,
  pageNumber: number = 0,
  pageSize: number = 20,
  sortField = "id",
  sortDirection = "ASC"
): Promise<PaginationResponse<VocabDetailDto>> => {
  try {
    const params: FetchUserVocabProps = {
      pageNumber,
      pageSize,
      sortField,
      sortDirection,
    };
    if (word) {
      params.word = word;
    }
    const response = await httpClient.get<PaginationResponse<VocabDetailDto>>(
      `/user-vocab`,
      { params }
    );
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch user dictionary: ${error}`);
  }
};

export const updateData = async (
  user: FormData | UserDetailInfoDto
): Promise<UserDetailInfoDto> => {
  const config =
    user instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : { headers: { "Content-Type": "application/json" } };
  const response = await httpClient.put<UserDetailInfoDto>(
    `/information`,
    user,
    config
  );
  return response;
};
