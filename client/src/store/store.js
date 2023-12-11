import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "../features/income/incomeSlice";

export const store = configureStore({
  reducer: {
    income: incomeReducer,
  },
});
