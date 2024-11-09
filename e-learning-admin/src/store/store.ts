import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/auth/authSlice';
import userReducer from '@/store/user/userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
