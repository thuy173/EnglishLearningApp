import { fetchData, fetchDataById } from "@/redux/api/courseApi";
import CourseDto, { CourseDetailDto } from "@/types/feature/Course";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  courses: CourseDto[];
  course: CourseDetailDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  courses: [],
  course: null,
  loading: false,
  error: null,
};

export const fetchCoursesData = createAsyncThunk<
  CourseDto[],
  {
    name: string;
    categoryId: number;
    levelId: number;
    pageNumber: number;
    pageSize: number;
    sortField: string;
    sortDirection: string;
  },
  { rejectValue: string }
>(
  "course/fetchData",
  async (
    {
      name,
      categoryId,
      levelId,
      pageNumber,
      pageSize,
      sortField,
      sortDirection,
    },
    { rejectWithValue }
  ) => {
    try {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch course");
    }
  }
);

export const fetchCourseDataById = createAsyncThunk<
  CourseDetailDto,
  number,
  { rejectValue: string }
>("course/fetchDataById", async (id, { rejectWithValue }) => {
  try {
    const response = await fetchDataById(id);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to fetch course by ID");
  }
});

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (course) => {
    course
      .addCase(fetchCoursesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursesData.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchCoursesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch By ID
      .addCase(fetchCourseDataById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseDataById.fulfilled, (state, action) => {
        state.course = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourseDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default courseSlice.reducer;
