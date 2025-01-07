import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import authSlice from '../features/auth/authSlice';
/**
 * RTK store setup
 */
export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
