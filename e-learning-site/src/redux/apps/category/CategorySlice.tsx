import { fetchData, fetchDataById } from "@/redux/api/categoryApi";
import CategoryDto from "@/types/feature/Category";
import { createAppThunk } from "@/utils/createThunk";
import { addLoadingCases } from "@/utils/redux.utils";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  categories: CategoryDto[];
  category: CategoryDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

interface FetchCategoriesParams {
  name: string;
  pageNumber: number;
  pageSize: number;
  sortField: string;
  sortDirection: string;
}

export const fetchCategoriesData = createAppThunk<
  CategoryDto[],
  FetchCategoriesParams
>(
  "category/fetchData",
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
  { errorMessage: "Failed to fetch categories" }
);

export const fetchCategoryDataById = createAppThunk<CategoryDto, number>(
  "category/fetchDataById",
  async (id) => {
    const response = await fetchDataById(id);
    return response;
  },
  { errorMessage: "Failed to fetch category by ID" }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all
    addLoadingCases(builder, fetchCategoriesData, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.categories = action.payload;
        }
        state.loading = false;
      },
    });
    // Get one
    addLoadingCases(builder, fetchCategoryDataById, {
      onFulfilled: (state, action) => {
        if (action && action.payload) {
          state.category = action.payload;
        }
        state.loading = false;
      },
    });
  },
});

export default categorySlice.reducer;
