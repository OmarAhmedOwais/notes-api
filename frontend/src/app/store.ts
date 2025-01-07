import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { authApi } from "../features/auth/authApi";
import authSlice from "../features/auth/authSlice";
import { foldersApi } from "../features/folders/foldersApi";
import { notesApi } from "../features/notes/notesApi";

/**
 * RTK store setup
 */

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  [foldersApi.reducerPath]: foldersApi.reducer,
  [notesApi.reducerPath]: notesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(foldersApi.middleware, notesApi.middleware, authApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
