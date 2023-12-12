import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "../features/income/incomeSlice";
import expenseReducer from "../features/expense/expenseSlice";

export const store = configureStore({
  reducer: {
    income: incomeReducer,
    expense: expenseReducer,
  },
});
