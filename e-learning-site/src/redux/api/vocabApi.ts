import VocabDto from "@/types/feature/Vocab";
import httpClient from "./agent";

export const fetchDataById = async (lessonId: number): Promise<VocabDto> => {
  try {
    const response = await httpClient.get<VocabDto>(`/lesson-vocab/${lessonId}`);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch lesson vocab: ${error}`);
  }
};

export const fetchShortDataById = async (lessonId: number): Promise<VocabDto> => {
  try {
    const response = await httpClient.get<VocabDto>(`/lesson-vocab/short/${lessonId}`);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch lesson vocab short: ${error}`);
  }
};

export const userVocabEvaluate = async (vocabId: number, word: string): Promise<string> => {
  const response = await httpClient.post<string>(`/user-vocab/${vocabId}/evaluate?word=${word}`);
  return response;
};
