import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showNotification } from "../message/MessageSlice";
import UserLoginDto, {
  ChangePassDto,
  ForgotPassDto,
  ResetPassDto,
  UserInfoDto,
} from "@/types/feature/Auth";
import {
  changePass,
  forgotPass,
  login,
  logout,
  resetPass,
} from "@/redux/api/authApi";
import Cookies from "js-cookie";
import { persistor } from "@/redux/store";
import { AxiosError } from "axios";

interface AuthState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  user: UserInfoDto | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null,
};

export const loginUser = createAsyncThunk<
  UserInfoDto,
  UserLoginDto,
  { rejectValue: string }
>("auth/login", async (reqData, { rejectWithValue, dispatch }) => {
  try {
    const userData = await login(reqData);
    dispatch(
      showNotification({
        message: "Đăng nhập thành công!",
        type: "success",
      })
    );
    return userData;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const errorMessage =
      axiosError.response?.data.message ||
      "Đăng nhập thất bại. Vui lòng thử lại.";
    dispatch(
      showNotification({
        message: errorMessage,
        type: "error",
      })
    );
    return rejectWithValue(errorMessage);
  }
});

export const changePassword = createAsyncThunk<
  void,
  ChangePassDto,
  { rejectValue: string }
>("auth/changePass", async (changeData, { rejectWithValue, dispatch }) => {
  try {
    await changePass(changeData);
    dispatch(
      showNotification({
        message: "Đổi mật khẩu thành công!",
        type: "success",
      })
    );
    dispatch(logoutUser());
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(
        showNotification({ message: "Đổi mật khẩu thất bại.", type: "error" })
      );
      return rejectWithValue(error.message);
    }
    dispatch(
      showNotification({ message: "Đổi mật khẩu thất bại.", type: "error" })
    );

    return rejectWithValue("Failed to change page");
  }
});

export const forgotPassword = createAsyncThunk<
  void,
  ForgotPassDto,
  { rejectValue: string }
>("auth/forgot", async (data, { rejectWithValue, dispatch }) => {
  try {
    await forgotPass(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(
        showNotification({
          message: "Địa chỉ email sai. Vui lòng nhập đúng email đăng kí",
          type: "error",
        })
      );
      return rejectWithValue(error.message);
    }
    dispatch(
      showNotification({
        message: "Địa chỉ email sai. Vui lòng nhập đúng email đăng kí",
        type: "error",
      })
    );

    return rejectWithValue("Failed to forgot pass");
  }
});
export const resetPassword = createAsyncThunk<
  void,
  ResetPassDto,
  { rejectValue: string }
>("auth/reset", async (data, { rejectWithValue, dispatch }) => {
  try {
    await resetPass(data);
    dispatch(
      showNotification({
        message: "Đổi mật khẩu thành công!",
        type: "success",
      })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(
        showNotification({
          message: "Đã xảy ra lỗi. Vui lòng kiểm tra lại",
          type: "error",
        })
      );
      return rejectWithValue(error.message);
    }
    dispatch(
      showNotification({
        message: "Đã xảy ra lỗi. Vui lòng kiểm tra lại",
        type: "error",
      })
    );

    return rejectWithValue("Failed to reset pass");
  }
});

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await logout();
    } finally {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      dispatch(
        showNotification({
          message: "Đăng xuất thành công!",
          type: "success",
        })
      );
      persistor.purge();
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (auth) => {
    auth

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })

      // Handle change pass
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle forgot pass
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle reset pass
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
