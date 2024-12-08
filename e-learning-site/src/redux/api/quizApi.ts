import TestingResponseDto, { PaginationResponse, QuizResult, TestingShortDto, TestSubmitPayload, UserQuizAttemptResponse } from "@/types/feature/Quiz";
import httpClient from "./agent";

export const startTest = async (quizId: string): Promise<string> => {
  const response = await httpClient.post<{ id: string}>(`/testing/${quizId}/attempts`);
  return response.id;
};

export const submitTest = async (payload: TestSubmitPayload): Promise<string> => {
  const response = await httpClient.put<{id: string}>(`/testing/${payload.quizId}/attempts`, payload);
  return response.id;
};

interface FetchParams {
  title?: string;
  levelId: number;
  lessonId?: number;
  pageNumber: number;
  pageSize: number;
  sortField: string;
  sortDirection: string;
}

export const fetchData = async (
  title?: string,
  levelId: number = 1,
  lessonId?: number,
  pageNumber: number = 0,
  pageSize: number = 20,
  sortField = "id",
  sortDirection = "ASC"
): Promise<PaginationResponse<TestingShortDto>> => {
  try {
    const params: FetchParams = {
      levelId,
      pageNumber,
      pageSize,
      sortField,
      sortDirection,
    };
    if (title) {
      params.title = title;
    }
    if (lessonId) {
      params.lessonId = lessonId;
    }

    const response = await httpClient.get<PaginationResponse<TestingShortDto>>("/testing", { params });
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch testing: ${error}`);
  }
};

export const fetchTestingById = async (
  id: string
): Promise<TestingResponseDto> => {
  try {
    const response = await httpClient.get<TestingResponseDto>(`/testing/${id}`);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch testing: ${error}`);
  }
};

export const fetchResultAttempt = async (
  attemptId: string
): Promise<QuizResult> => {
  try {
    const response = await httpClient.get<QuizResult>(`/testing/${attemptId}/result`);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch result testing: ${error}`);
  }
};

interface FetchAttemptParams {
  quizTitle?: string;
  passed?: boolean;
  startedAt?: string;
  completedAt?: string;
  pageNumber: number;
  pageSize: number;
  sortField: string;
  sortDirection: string;
}

export const fetchUserQuizAttemptData = async (
  quizTitle?: string,
  passed?: boolean,
  startedAt?: string,
  completedAt?: string,
  pageNumber: number = 0,
  pageSize: number = 20,
  sortField = "id",
  sortDirection = "ASC"
): Promise<PaginationResponse<UserQuizAttemptResponse>> => {
  try {
    const params: FetchAttemptParams = {
      pageNumber,
      pageSize,
      sortField,
      sortDirection,
    };
    if (quizTitle) {
      params.quizTitle = quizTitle;
    }
    if (passed) {
      params.passed = passed;
    }
    if (startedAt) {
      params.startedAt = startedAt;
    }
    if (completedAt) {
      params.completedAt = completedAt;
    }

    const response = await httpClient.get<PaginationResponse<UserQuizAttemptResponse>>("/testing/user-attempt", { params });
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch user quiz attempt: ${error}`);
  }
};