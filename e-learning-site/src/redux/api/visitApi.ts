import VisitDto, { VisitResponse } from "@/types/feature/Visit";
import axiosInstance from "./agent";

export const fetchData = async (
  index: number = 1,
  size: number = 20,
  search: string = "",
  contractDetailId: string = ""
): Promise<VisitResponse[]> => {
  try {
    const response = await axiosInstance.get("/application/visits", {
      params: {
        index,
        size,
        search,
        contractDetailId,
      },
      paramsSerializer: (params) => {
        return new URLSearchParams(params).toString().replace(/\+/g, "%20");
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch service: ${error}`);
  }
};
export const fetchDataById = async (id: number): Promise<VisitDto> => {
  try {
    const response = await axiosInstance.get(`/application/visits/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch service: ${error}`);
  }
};

export const visit = async (visitData: VisitDto): Promise<string> => {
  const response = await axiosInstance.post("/application/visits", visitData);
  console.log("Visits successfully:", response.data);
  return response.data.message;
};
