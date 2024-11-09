import { AuthRes, LoginReq } from '@/models/auth';
import authService from '@/services/authService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser } from '../user/userSlice';
import { deleteRefreshTokenCookie, deleteTokenCookie, getTokenFromCookie, setRefreshTokenCookie, setTokenCookie } from '@/utils/cookieUtils';

export interface AuthState {
    authRes: AuthRes;
    isAuthenticated: boolean;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    authRes: {} as AuthRes,
    isAuthenticated: false,
    token: getTokenFromCookie() || null,
    loading: false,
    error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (req: LoginReq, { rejectWithValue }) => {
        deleteTokenCookie()
        deleteRefreshTokenCookie()
        try {
            const response = await authService.login(req)
            setTokenCookie(response.accessToken)
            setRefreshTokenCookie(response.refreshToken)
            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to login!');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.authRes = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchUser.fulfilled, (state) => {
                state.isAuthenticated = true;
            })
    },
});

export default authSlice.reducer;