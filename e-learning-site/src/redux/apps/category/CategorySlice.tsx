import { fetchData, fetchDataById } from "@/redux/api/categoryApi";
import CategoryDto from "@/types/feature/Category";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const fetchCategoriesData = createAsyncThunk<
  CategoryDto[],
  {
    name: string;
    pageNumber: number;
    pageSize: number;
    sortField: string;
    sortDirection: string;
  },
  { rejectValue: string }
>(
  "category/fetchData",
  async (
    { name, pageNumber, pageSize, sortField, sortDirection },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchData(
        name,
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
      return rejectWithValue("Failed to fetch category");
    }
  }
);

export const fetchCategoryDataById = createAsyncThunk<
  CategoryDto,
  number,
  { rejectValue: string }
>("category/fetchDataById", async (id, { rejectWithValue }) => {
  try {
    const response = await fetchDataById(id);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to fetch category by ID");
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (category) => {
    category
      .addCase(fetchCategoriesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesData.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategoriesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch By ID
      .addCase(fetchCategoryDataById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryDataById.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategoryDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
