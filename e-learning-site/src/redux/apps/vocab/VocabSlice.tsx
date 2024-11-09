import { fetchDataById, fetchShortDataById } from "@/redux/api/vocabApi";
import VocabDto, { VocabDetailDto, VocabShortDto } from "@/types/feature/Vocab";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  lessonVocab: VocabDto | null;
  vocabularies: VocabDetailDto[];
  shortVocab: VocabShortDto[];
  vocabulary: VocabDetailDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  lessonVocab: null,
  vocabularies: [],
  shortVocab: [],
  vocabulary: null,
  loading: false,
  error: null,
};

export const fetchVocabDataByLessonId = createAsyncThunk<
  VocabDto,
  number,
  { rejectValue: string }
>("vocab/fetchVocabDataByLessonId", async (lessonId, { rejectWithValue }) => {
  try {
    const response = await fetchDataById(lessonId);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to fetch vocab by lesson ID");
  }
});
export const fetchShortVocabDataByLessonId = createAsyncThunk<
VocabDto,
  number,
  { rejectValue: string }
>(
  "vocab/fetchShortVocabDataByLessonId",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await fetchShortDataById(lessonId);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch vocab short by lesson ID");
    }
  }
);

const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {},
  extraReducers: (vocab) => {
    vocab
      // fetch by lesson id
      .addCase(fetchVocabDataByLessonId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVocabDataByLessonId.fulfilled, (state, action) => {
        state.lessonVocab = action.payload;
        state.vocabularies = action.payload.vocabularies;
        state.loading = false;
      })
      .addCase(fetchVocabDataByLessonId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetch short by lesson id
      .addCase(fetchShortVocabDataByLessonId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShortVocabDataByLessonId.fulfilled, (state, action) => {
        state.shortVocab = action.payload.vocabularies;
        state.loading = false;
      })
      .addCase(fetchShortVocabDataByLessonId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default vocabSlice.reducer;
