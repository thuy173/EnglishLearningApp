import VocabDto from "@/types/feature/Vocab";
import axiosInstance from "./agent";

export const fetchDataById = async (lessonId: number): Promise<VocabDto> => {
  try {
    const response = await axiosInstance.get(`/lesson-vocab/${lessonId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch lesson vocab: ${error}`);
  }
};

export const fetchShortDataById = async (lessonId: number): Promise<VocabDto> => {
  try {
    const response = await axiosInstance.get(`/lesson-vocab/short/${lessonId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch lesson vocab short: ${error}`);
  }
};
