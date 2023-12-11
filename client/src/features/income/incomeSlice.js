import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  incomeData: [],
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

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (incomeData) => {
    const response = await fetch("http://localhost:9000/api/add-income", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(incomeData),
    });

    if (!response.ok) throw new Error(response.statusText);
    const jsonData = await response.json();
    return jsonData.income;
  }
);

export const deleteIncome = createAsyncThunk(
  "income/deleteIncome",
  async (incomeId) => {
    console.log(incomeId);
    const response = await fetch(
      `http://localhost:9000/api/delete-income/${incomeId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) throw new Error(response.statusText);
    const jsonData = await response.json();
    return jsonData;
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
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.incomeData = [...state.incomeData, action.payload];
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteIncome.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.incomeData = state.incomeData.filter(
          (income) => income._id !== action.payload._id
        );
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const incomeReducer = incomeSlice.reducer;

export default incomeReducer;
