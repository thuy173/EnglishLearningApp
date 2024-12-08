import {
  fetchData,
  fetchDataById,
  fetchLatest,
  fetchMostEnrolled,
  fetchRandom,
} from "@/redux/api/courseApi";
import CourseDto, { CourseDetailDto } from "@/types/feature/Course";
import { createAppThunk } from "@/utils/createThunk";
import { addLoadingCases } from "@/utils/redux.utils";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  courses: CourseDto[];
  courseLatest: CourseDto[];
  courseMostEnrolled: CourseDto[];
  courseRandom: CourseDto[];
  course: CourseDetailDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  courses: [],
  courseLatest: [],
  courseMostEnrolled: [],
  courseRandom: [],
  course: null,
  loading: false,
  error: null,
};

interface FetchCoursesDataParams {
  name: string;
  categoryId: number;
  levelId: number;
  pageNumber: number;
  pageSize: number;
  sortField: string;
  sortDirection: string;
}

export const fetchCoursesData = createAppThunk<
  CourseDto[],
  FetchCoursesDataParams
>(
  "course/fetchData",
  async ({
    name,
    categoryId,
    levelId,
    pageNumber,
    pageSize,
    sortField,
    sortDirection,
  }) => {
    const response = await fetchData(
      name,
      categoryId,
      levelId,
      pageNumber,
      pageSize,
      sortField,
      sortDirection
    );
    return response;
  },
  { errorMessage: "Failed to fetch course" }
);

export const fetchCourseDataById = createAppThunk<CourseDetailDto, number>(
  "course/fetchDataById",
  async (id) => {
    const response = await fetchDataById(id);
    return response;
  },
  { errorMessage: "Failed to fetch course by ID" }
);

export const fetchLatestData = createAppThunk<CourseDto[], void>(
  "course/fetchLatest",
  async () => {
    const response = await fetchLatest();
    return response;
  },
  { errorMessage: "Failed to fetch course latest." }
);

export const fetchMostEnrolledData = createAppThunk<CourseDto[], void>(
  "course/fetchMostEnrolled",
  async () => {
    const response = await fetchMostEnrolled();
    return response;
  },
  { errorMessage: "Failed to fetch course most enrolled." }
);

export const fetchRandomData = createAppThunk<CourseDto[], void>(
  "course/fetchRandom",
  async () => {
    const response = await fetchRandom();
    return response;
  },
  { errorMessage: "Failed to fetch course random." }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all course
    addLoadingCases(builder, fetchCoursesData, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.courses = action.payload;
        }
        state.loading = false;
      },
    });
    // Get latest course
    addLoadingCases(builder, fetchLatestData, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.courseLatest = action.payload;
        }
        state.loading = false;
      },
    });
    // Get most enroll course
    addLoadingCases(builder, fetchMostEnrolledData, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.courseMostEnrolled = action.payload;
        }
        state.loading = false;
      },
    });
    // Get random course
    addLoadingCases(builder, fetchRandomData, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.courseRandom = action.payload;
        }
        state.loading = false;
      },
    });
    // Get one course
    addLoadingCases(builder, fetchCourseDataById, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.course = action.payload;
        }
        state.loading = false;
      },
    });
  },
});

export default courseSlice.reducer;
