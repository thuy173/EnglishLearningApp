import { fetchData, fetchDataById } from "@/redux/api/lessonApi";
import LessonDto from "@/types/feature/Lesson";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const fetchLessonsData = createAsyncThunk<
  LessonDto[],
  {
    name: string;
    courseId: number;
    pageNumber: number;
    pageSize: number;
    sortField: string;
    sortDirection: string;
  },
  { rejectValue: string }
>(
  "lesson/fetchData",
  async (
    { name, courseId, pageNumber, pageSize, sortField, sortDirection },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchData(
        name,
        courseId,
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
      return rejectWithValue("Failed to fetch lesson");
    }
  }
);

export const fetchLessonDataById = createAsyncThunk<
  LessonDto,
  number,
  { rejectValue: string }
>("lesson/fetchDataById", async (id, { rejectWithValue }) => {
  try {
    const response = await fetchDataById(id);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to fetch lesson by ID");
  }
});

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {},
  extraReducers: (lesson) => {
    lesson
      .addCase(fetchLessonsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessonsData.fulfilled, (state, action) => {
        state.lessons = action.payload;
        state.loading = false;
      })
      .addCase(fetchLessonsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch By ID
      .addCase(fetchLessonDataById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessonDataById.fulfilled, (state, action) => {
        state.lesson = action.payload;
        state.loading = false;
      })
      .addCase(fetchLessonDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default lessonSlice.reducer;
