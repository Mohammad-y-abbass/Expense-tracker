import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  income: [],
  status: "idle",
  error: null,
};

export const fetchIncomeData = createAsyncThunk(
  "income/fetchIncomeData",
  async () => {
    const response = await fetch("http://localhost:9000/api/get-income");
    if (!response.ok) throw new Error(response.statusText);
    const jsonData = await response.json();
    return jsonData.income;
  }
);

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomeData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIncomeData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.incomeData = action.payload;
      })
      .addCase(fetchIncomeData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getIcomeDataStart, getIncomeDataSuccess, getIncomeDataFailure } =
  incomeSlice.actions;

const incomeReducer = incomeSlice.reducer;

export default incomeReducer;
