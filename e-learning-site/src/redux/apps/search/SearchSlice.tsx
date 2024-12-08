import { search } from "@/redux/api/searchApi";
import SearchRequest, {
  CourseSearchDto,
  SearchResponse,
  VocabSearchDto,
} from "@/types/feature/Search";
import { createAppThunk } from "@/utils/createThunk";
import { addLoadingCases } from "@/utils/redux.utils";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  courses: CourseSearchDto[];
  vocabularies: VocabSearchDto[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  courses: [],
  vocabularies: [],
  loading: false,
  error: null,
};

export const searchData = createAppThunk<SearchResponse, SearchRequest>(
  "app/search",
  async (payload) => {
    const response = await search(payload);
    return response;
  },
  { errorMessage: "Failed to search" }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.courses = [];
      state.vocabularies = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    addLoadingCases(builder, searchData, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.courses = action.payload.courses;
          state.vocabularies = action.payload.vocabularies;
        }
        state.loading = false;
      },
    });
  },
});

export const { clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
