import { UserRes } from '@/models/user';
import userService from '@/services/userService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface UserState {
    user: UserRes;
    fetching: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: {} as UserRes,
    fetching: false,
    loading: false,
    error: null,
}

export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async () => {
        const response = await userService.getUser()
        return response
    }
)

// export const updateUser = createAsyncThunk(
//     'users/updateUser',
//     async (req: UserUpdateReq) => {
//         await userService.updateUserProfile(req)
//         return req
//     }
// )

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch user
            .addCase(fetchUser.pending, (state) => {
                state.fetching = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.fetching = false;
                // state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.fetching = false;
                state.error = action.error.message || 'Failed to fetch user';
            })
        // update user
        // .addCase(updateUser.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // })
        // .addCase(updateUser.fulfilled, (state, action) => {
        //     state.loading = false;
        //     const req = action.payload;

        //     const updatedUser = {
        //         ...req,
        //         issueDate: req.issueDate.toString(),
        //         dateOfBirth: req.dateOfBirth.toString(),
        //         avatar: `http://209.145.62.69:2234/Resource/${req.avatar}`
        //     };

        //     // Update the state
        //     state.user = { ...state.user, ...updatedUser };
        // })
        // .addCase(updateUser.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.error.message || 'Failed to fetch user';
        // })
    },
});

export default userSlice.reducer
