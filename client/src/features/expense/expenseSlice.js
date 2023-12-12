import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  expenseData: [],
  status: "idle",
  error: null,
};

export const fetchExpenseData = createAsyncThunk(
  "expense/fetchExpenseData",
  async () => {
    const response = await fetch("http://localhost:9000/api/get-expense");
    if (!response.ok) throw new Error(response.statusText);
    const jsonData = await response.json();
    return jsonData.expense;
  }
);

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expenseData) => {
    const response = await fetch("http://localhost:9000/api/add-expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    });

    if (!response.ok) throw new Error(response.statusText);

    const jsonData = await response.json();
    return jsonData.expense;
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (expenseId) => {
    const response = await fetch(
      `http://localhost:9000/api/delete-expense/${expenseId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) throw new Error(response.statusText);

    return expenseId;
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpenseData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenseData = action.payload;
      })
      .addCase(fetchExpenseData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenseData = [...state.expenseData, action.payload];
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenseData = state.expenseData.filter(
          (expense) => expense._id !== action.payload
        );
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default expenseSlice.reducer;
