import {
  fetchData,
  fetchDictionaryData,
  updateData,
} from "@/redux/api/userApi";
import { PaginationResponse } from "@/types/feature/Quiz";
import UserDetailInfoDto from "@/types/feature/User";
import { FetchUserVocabProps, VocabDetailDto } from "@/types/feature/Vocab";
import { createAppThunk } from "@/utils/createThunk";
import { addLoadingCases } from "@/utils/redux.utils";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  user: UserDetailInfoDto | null;
  vocabularies: VocabDetailDto[];
  totalElements: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  user: null,
  vocabularies: [],
  totalElements: 0,
  totalPages: 0,
  loading: false,
  error: null,
};

export const fetchUserInfo = createAppThunk<UserDetailInfoDto, void>(
  "user/fetchUserInfo",
  async () => {
    const response = await fetchData();
    return response;
  },
  { errorMessage: "Failed to fetch user information." }
);

export const fetchUserVocab = createAppThunk<
  PaginationResponse<VocabDetailDto>,
  FetchUserVocabProps
>(
  "user/fetchUserVocab",
  async ({ word, pageNumber, pageSize, sortField, sortDirection }) => {
    const response = await fetchDictionaryData(
      word,
      pageNumber,
      pageSize,
      sortField,
      sortDirection
    );
    return response;
  },
  { errorMessage: "Failed to fetch user vocab." }
);

export const updateUser = createAppThunk<
  UserDetailInfoDto,
  { user: FormData | UserDetailInfoDto }
>(
  "user/updateUser",
  async ({ user }) => {
    const response = await updateData(user);
    return response;
  },
  { errorMessage: "Failed to update user." }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get info
    addLoadingCases(builder, fetchUserInfo, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.user = action.payload;
        }
        state.loading = false;
      },
    });
    // Get user vocab
    addLoadingCases(builder, fetchUserVocab, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.vocabularies = action.payload.content;
          state.totalElements = action.payload.totalElements;
          state.totalPages = action.payload.totalPages;
        }
        state.loading = false;
      },
    });
    // Other
    addLoadingCases(builder, updateUser);
  },
});

export default userSlice.reducer;
