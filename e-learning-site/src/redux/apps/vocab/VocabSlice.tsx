import {
  fetchDataById,
  fetchShortDataById,
  userVocabEvaluate,
} from "@/redux/api/vocabApi";
import VocabDto, { VocabDetailDto, VocabShortDto } from "@/types/feature/Vocab";
import { createAppThunk } from "@/utils/createThunk";
import { addLoadingCases } from "@/utils/redux.utils";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  lessonVocab: VocabDto | null;
  vocabularies: VocabDetailDto[];
  shortVocab: VocabShortDto[];
  vocabulary: VocabDetailDto | null;
  evaluationResult: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  lessonVocab: null,
  vocabularies: [],
  shortVocab: [],
  vocabulary: null,
  evaluationResult: null,
  loading: false,
  error: null,
};

export const fetchVocabDataByLessonId = createAppThunk<VocabDto, number>(
  "vocab/fetchVocabDataByLessonId",
  async (lessonId) => {
    const response = await fetchDataById(lessonId);
    return response;
  },
  { errorMessage: "Failed to fetch vocab by lesson ID" }
);

export const fetchShortVocabDataByLessonId = createAppThunk<VocabDto, number>(
  "vocab/fetchShortVocabDataByLessonId",
  async (lessonId) => {
    const response = await fetchShortDataById(lessonId);
    return response;
  },
  { errorMessage: "Failed to fetch vocab short by lesson ID" }
);

export const evaluateUserVocab = createAppThunk<
  string,
  { vocabId: number; word: string }
>(
  "vocab/evaluateUserVocab",
  async ({ vocabId, word }) => {
    const response = await userVocabEvaluate(vocabId, word);
    return response;
  },
  { errorMessage: "Failed to evaluate vocabulary" }
);

const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get by lesson id
    addLoadingCases(builder, fetchVocabDataByLessonId, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.lessonVocab = action.payload;
          state.vocabularies = action.payload.vocabularies;
        }
        state.loading = false;
      },
    });
    // Get short by lesson id
    addLoadingCases(builder, fetchShortVocabDataByLessonId, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.shortVocab = action.payload.vocabularies;
        }
        state.loading = false;
      },
    });
    // Evaluate user vocab
    addLoadingCases(builder, evaluateUserVocab, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.evaluationResult = action.payload;
        }
        state.loading = false;
      },
    });
  },
});

export default vocabSlice.reducer;
