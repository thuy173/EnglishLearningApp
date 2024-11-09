import { fetchData } from "@/redux/api/visitApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showNotification } from "../message/MessageSlice";
import VisitDto, { VisitResponse } from "@/types/feature/Visit";
import { visit } from "@/redux/api/visitApi";
import { AxiosError } from "axios";

interface ServiceState {
  visits: VisitResponse[];
  visit: VisitDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  visits: [],
  visit: null,
  loading: false,
  error: null,
};

export const fetchVisitsData = createAsyncThunk<
  VisitResponse[],
  { index: number; size: number; search: string; contractDetailId: string },
  { rejectValue: string }
>(
  "visit/fetchData",
  async ({ index, size, search, contractDetailId }, { rejectWithValue }) => {
    try {
      const response = await fetchData(index, size, search, contractDetailId);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch visit");
    }
  }
);

export const visitNiche = createAsyncThunk<
  void,
  VisitDto,
  { rejectValue: string }
>("visit/addVisit", async (visitData, { rejectWithValue, dispatch }) => {
  try {
    await visit(visitData);
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Đặt lịch thất bại.";
    dispatch(showNotification({ message: errorMessage, type: "error" }));
    return rejectWithValue(errorMessage);
  }
});

const visitSlice = createSlice({
  name: "visit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisitsData.fulfilled, (state, action) => {
        state.visits = action.payload;
        state.loading = false;
      })
      .addCase(fetchVisitsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle createOrder
      .addCase(visitNiche.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(visitNiche.fulfilled, (state) => {
        state.loading = false;
        // Optional: If needed, you could update the state with the new order
      })
      .addCase(visitNiche.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default visitSlice.reducer;
