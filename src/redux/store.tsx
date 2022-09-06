import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import treeReducer from "./treeSlice";

export const store = configureStore({
  reducer: {
    treeReducer,
  },
});
