import { createSlice } from "@reduxjs/toolkit";
import { persistor } from "@/redux/store";
import { UserInfoDto } from "@/types/feature/Auth";
import authService from "@/redux/api/authApi";
import { AUTH_MESSAGES } from "@/constants/auth.constants";
import Cookies from "js-cookie";
import { API_CONFIG } from "@/types/feature/Config";
import { addLoadingCases, defaultHandlers } from "@/utils/redux.utils";
import { createAppThunk } from "@/utils/createThunk";

export interface AuthState {
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

export const googleLoginUser = createAppThunk(
  "auth/googleLogin",
  authService.googleLogin,
  {
    successMessage: AUTH_MESSAGES.LOGIN.SUCCESS,
    errorMessage: AUTH_MESSAGES.LOGIN.ERROR,
  }
);

export const loginUser = createAppThunk("auth/login", authService.login, {
  successMessage: AUTH_MESSAGES.LOGIN.SUCCESS,
  errorMessage: AUTH_MESSAGES.LOGIN.ERROR,
});

export const registerUser = createAppThunk(
  "auth/register",
  authService.register,
  {
    successMessage: AUTH_MESSAGES.REGISTER.SUCCESS,
    errorMessage: AUTH_MESSAGES.REGISTER.ERROR,
  }
);

export const logoutUser = createAppThunk(
  "auth/logout",
  async () => {
    await authService.logout();
    Cookies.remove(API_CONFIG.tokenCookieName);
    Cookies.remove(API_CONFIG.refreshTokenCookieName);
    persistor.purge();
  },
  {
    successMessage: AUTH_MESSAGES.LOGOUT.SUCCESS,
  }
);

export const changePassword = createAppThunk(
  "auth/changePass",
  authService.changePassword,
  {
    successMessage: AUTH_MESSAGES.CHANGE_PASSWORD.SUCCESS,
    errorMessage: AUTH_MESSAGES.CHANGE_PASSWORD.ERROR,
    onSuccess: (dispatch) => dispatch(logoutUser()),
  }
);

export const forgotPassword = createAppThunk(
  "auth/forgot",
  authService.forgotPassword,
  {
    errorMessage: AUTH_MESSAGES.FORGOT_PASSWORD.ERROR,
  }
);

export const resetPassword = createAppThunk(
  "auth/reset",
  authService.resetPassword,
  {
    successMessage: AUTH_MESSAGES.RESET_PASSWORD.SUCCESS,
    errorMessage: AUTH_MESSAGES.RESET_PASSWORD.ERROR,
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    addLoadingCases(builder, loginUser, {
      onFulfilled: (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      },
    });
    // Login google
    addLoadingCases(builder, googleLoginUser, {
      onFulfilled: (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      },
    });
    // forgot
    addLoadingCases(builder, forgotPassword, {
      onFulfilled: (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      },
    });
    // Logout
    addLoadingCases(builder, logoutUser, {
      onFulfilled: (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      },
      onRejected: (state, action) => {
        defaultHandlers.handleError(state, action ?? { payload: undefined });
        state.isAuthenticated = false;
        state.user = null;
      },
    });
    // Other
    addLoadingCases(builder, changePassword);
    addLoadingCases(builder, resetPassword);
  },
});

export default authSlice.reducer;
