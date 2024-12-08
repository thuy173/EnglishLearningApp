import SearchRequest, { SearchResponse } from "@/types/feature/Search";
import httpClient from "./agent";

export const search = async (
  request: SearchRequest
): Promise<SearchResponse> => {
  const response = await httpClient.post<SearchResponse>(`/search`, request);
  return response;
};
