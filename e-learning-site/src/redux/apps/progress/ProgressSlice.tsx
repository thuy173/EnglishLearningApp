import {
  fetchProgressCourse,
  progressEnroll,
  progressLesson,
} from "@/redux/api/progressApi";
import ProgressDto, { LessonProgressRequest } from "@/types/feature/Progress";
import { createAppThunk } from "@/utils/createThunk";
import { addLoadingCases } from "@/utils/redux.utils";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  progress: ProgressDto | null;
  userCourseId: number;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  progress: null,
  userCourseId: 0,
  loading: false,
  error: null,
};

export const enroll = createAppThunk<number, { courseId: number }>(
  "progress/enroll",
  async ({ courseId }) => {
    const userCourseId = await progressEnroll(courseId);
    return userCourseId;
  },
  { errorMessage: "Failed to enroll" }
);

export const lessonEnroll = createAppThunk<
  void,
  { request: LessonProgressRequest }
>(
  "progress/lessonEnroll",
  async ({ request }) => {
    await progressLesson(request);
  },
  { errorMessage: "Failed to lesson enroll" }
);

export const fetchProgressCourseData = createAppThunk<ProgressDto, number>(
  "progress/fetchProgressCourse",
  async (courseId) => {
    const response = await fetchProgressCourse(courseId);
    return response;
  },
  { errorMessage: "Failed to fetch progress" }
);

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Enroll
    addLoadingCases(builder, enroll, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.userCourseId = action.payload;
        }
        state.loading = false;
      },
    });
    // Progress course
    addLoadingCases(builder, fetchProgressCourseData, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.progress = action.payload;
        }
        state.loading = false;
      },
    });
  },
});

export default progressSlice.reducer;
