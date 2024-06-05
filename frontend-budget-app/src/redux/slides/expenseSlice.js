import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  expenses: [],
  error: null,
  loading: false,
};

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expenseData) => {
    try {
      const response = await axios.post(`${BASE_URL}add-expense`, expenseData);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response.data.message);
    }
  }
);

export const getExpenses = createAsyncThunk("expense/getExpenses", async () => {
  try {
    const response = await axios.get(`${BASE_URL}get-expenses`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
});

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      return id; // Return the deleted income ID for potential UI updates
    } catch (error) {
      return Promise.reject(error.response.data.message);
    }
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.push(action.payload);
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        const expenseIndex = state.expenses.findIndex(
          (expense) => expense.id === action.payload
        );
        if (expenseIndex !== -1) {
          state.expenses.splice(expenseIndex, 1);
        }
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default expenseSlice.reducer;
