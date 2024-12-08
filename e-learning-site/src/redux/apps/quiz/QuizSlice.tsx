import {
  fetchData,
  fetchResultAttempt,
  fetchTestingById,
  fetchUserQuizAttemptData,
  startTest,
  submitTest,
} from "@/redux/api/quizApi";
import TestingResponseDto, {
  PaginationResponse,
  QuizResult,
  TestingShortDto,
  TestSubmitPayload,
  UserQuizAttemptResponse,
} from "@/types/feature/Quiz";
import { createAppThunk } from "@/utils/createThunk";
import { addLoadingCases } from "@/utils/redux.utils";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  testings: TestingShortDto[];
  testing: TestingResponseDto | null;
  totalElements: number;
  totalPages: number;
  resultData: QuizResult | null;
  results: UserQuizAttemptResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  testings: [],
  testing: null,
  totalElements: 0,
  totalPages: 0,
  resultData: null,
  results: [],
  loading: false,
  error: null,
};
interface FetchTestingsParams {
  title: string;
  levelId: number;
  lessonId: number;
  pageNumber: number;
  pageSize: number;
  sortField: string;
  sortDirection: string;
}

export const fetchTestingsData = createAppThunk<
  PaginationResponse<TestingShortDto>,
  FetchTestingsParams
>(
  "testing/fetchData",
  async ({
    title,
    levelId,
    lessonId,
    pageNumber,
    pageSize,
    sortField,
    sortDirection,
  }) => {
    const response = await fetchData(
      title,
      levelId,
      lessonId,
      pageNumber,
      pageSize,
      sortField,
      sortDirection
    );
    return response;
  },
  { errorMessage: "Failed to fetch quiz" }
);

interface FetchUserQuizAttemptsParams {
  quizTitle: string;
  passed: boolean;
  startedAt: string;
  completedAt: string;
  pageNumber: number;
  pageSize: number;
  sortField: string;
  sortDirection: string;
}
export const fetchUserQuizAttempts = createAppThunk<
  PaginationResponse<UserQuizAttemptResponse>,
  FetchUserQuizAttemptsParams
>(
  "testing/fetchUserQuizAttemptData",
  async ({
    quizTitle,
    passed,
    startedAt,
    completedAt,
    pageNumber,
    pageSize,
    sortField,
    sortDirection,
  }) => {
    const response = await fetchUserQuizAttemptData(
      quizTitle,
      passed,
      startedAt,
      completedAt,
      pageNumber,
      pageSize,
      sortField,
      sortDirection
    );
    return response;
  },
  { errorMessage: "Failed to fetch quiz" }
);

export const fetchTestingDataById = createAppThunk<TestingResponseDto, string>(
  "testing/fetchDataById",
  async (id) => {
    const response = await fetchTestingById(id);
    return response;
  },
  { errorMessage: "Failed to fetch testing" }
);

export const fetchResultAttemptData = createAppThunk<QuizResult, string>(
  "testing/fetchResultData",
  async (attemptId) => {
    const response = await fetchResultAttempt(attemptId);
    return response;
  },
  { errorMessage: "Failed to fetch result testing" }
);

export const startTesting = createAppThunk<string, { quizId: string }>(
  "testing/start",
  async ({ quizId }) => {
    const testingId = await startTest(quizId);
    return testingId;
  },
  { errorMessage: "Failed to start testing" }
);

export const submitTesting = createAppThunk<string, TestSubmitPayload>(
  "testing/submit",
  async (payload) => {
    const attemptId = await submitTest(payload);
    return attemptId;
  },
  { errorMessage: "Failed to start testing" }
);

const testingSlice = createSlice({
  name: "testing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all
    addLoadingCases(builder, fetchTestingsData, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.testings = action.payload.content;
          state.totalElements = action.payload.totalElements;
          state.totalPages = action.payload.totalPages;
        }
        state.loading = false;
      },
    });
    // User quiz attempt
    addLoadingCases(builder, fetchUserQuizAttempts, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.results = action.payload.content;
          state.totalElements = action.payload.totalElements;
          state.totalPages = action.payload.totalPages;
        }
        state.loading = false;
      },
    });
    //  Fetch By ID
    addLoadingCases(builder, fetchTestingDataById, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.testing = action.payload;
        }
        state.loading = false;
      },
    });
    //  Result
    addLoadingCases(builder, fetchResultAttemptData, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.resultData = action.payload;
        }
        state.loading = false;
      },
    });
    // Other
    addLoadingCases(builder, startTesting);
    addLoadingCases(builder, submitTesting);
  },
});

export default testingSlice.reducer;
