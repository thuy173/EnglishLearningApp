import { fetchData, fetchDataById } from "@/redux/api/lessonApi";
import LessonDto from "@/types/feature/Lesson";
import { createAppThunk } from "@/utils/createThunk";
import { addLoadingCases } from "@/utils/redux.utils";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  lessons: LessonDto[];
  lesson: LessonDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  lessons: [],
  lesson: null,
  loading: false,
  error: null,
};

interface FetchLessonsParams {
  name: string;
  courseId: number;
  pageNumber: number;
  pageSize: number;
  sortField: string;
  sortDirection: string;
}

export const fetchLessonsData = createAppThunk<LessonDto[], FetchLessonsParams>(
  "lesson/fetchData",
  async ({
    name,
    courseId,
    pageNumber,
    pageSize,
    sortField,
    sortDirection,
  }) => {
    const response = await fetchData(
      name,
      courseId,
      pageNumber,
      pageSize,
      sortField,
      sortDirection
    );
    return response;
  },
  { errorMessage: "Failed to fetch lesson" }
);

export const fetchLessonDataById = createAppThunk<LessonDto, number>(
  "lesson/fetchDataById",
  async (id) => {
    const response = await fetchDataById(id);
    return response;
  },
  { errorMessage: "Failed to fetch lesson by ID" }
);

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all
    addLoadingCases(builder, fetchLessonsData, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.lessons = action.payload;
        }
        state.loading = false;
      },
    });
    // Get one
    addLoadingCases(builder, fetchLessonDataById, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.lesson = action.payload;
        }
        state.loading = false;
      },
    });
  },
});

export default lessonSlice.reducer;
