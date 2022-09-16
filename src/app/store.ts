import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { drawApiRecent, drawApiDrawID } from "../services/draws";

export const store = configureStore({
  reducer: {
    [drawApiRecent.reducerPath]: drawApiRecent.reducer,
    [drawApiDrawID.reducerPath]: drawApiDrawID.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(drawApiRecent.middleware),
});

setupListeners(store.dispatch);
