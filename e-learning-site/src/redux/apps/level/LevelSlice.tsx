import { fetchData } from "@/redux/api/levelApi";
import LevelDto from "@/types/feature/Level";
import { createAppThunk } from "@/utils/createThunk";
import { addLoadingCases } from "@/utils/redux.utils";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  levels: LevelDto[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  levels: [],
  loading: false,
  error: null,
};

interface FetchLevelsParams {
  name: string;
  pageNumber: number;
  pageSize: number;
  sortField: string;
  sortDirection: string;
}

export const fetchLevelsData = createAppThunk<LevelDto[], FetchLevelsParams>(
  "level/fetchData",
  async ({ name, pageNumber, pageSize, sortField, sortDirection }) => {
    const response = await fetchData(
      name,
      pageNumber,
      pageSize,
      sortField,
      sortDirection
    );
    return response;
  },
  { errorMessage: "Failed to fetch level" }
);

const levelSlice = createSlice({
  name: "level",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all
    addLoadingCases(builder, fetchLevelsData, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.levels = action.payload;
        }
        state.loading = false;
      },
    });
  },
});

export default levelSlice.reducer;
