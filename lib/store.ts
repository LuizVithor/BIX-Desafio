import authReducer from "./features/authSlice";
import dataReducer from "./features/dataSlice";
import { configureStore } from "@reduxjs/toolkit";
import filtersReducer, { filtersMiddleware } from "./features/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filtersMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;