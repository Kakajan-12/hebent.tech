import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { hebent } from "@/app/api/api";

const rootSlice = createSlice({
  name: "root",
  initialState: {},
  reducers: {},
});

export const store = configureStore({
  reducer: {
    root: rootSlice.reducer,
    [hebent.reducerPath]: hebent.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hebent.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
