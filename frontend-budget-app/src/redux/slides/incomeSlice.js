import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "/api/income/";
const initialState = {
  incomes: [],
  error: null,
  loading: false,
};

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (incomeData) => {
    try {
      const response = await axios.post(`${BASE_URL}add-income`, incomeData);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response.data.message);
    }
  }
);

export const getIncomes = createAsyncThunk(
  "income/getIncomes",
  async (token) => {
    console.log(token);
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`, {
        headers: { Authorization: token },
      });
      console.log(response.data);
      return response?.data;
    } catch (error) {
      return Promise.reject(error.response.data.message);
    }
  }
);

export const deleteIncome = createAsyncThunk(
  "income/deleteIncome",
  async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      return id; // Return the deleted income ID for potential UI updates
    } catch (error) {
      return Promise.reject(error.response.data.message);
    }
  }
);

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes.push(action.payload);
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload;
      })
      .addCase(getIncomes.rejected, (state, action) => {
        state.loading = false;
        console.log(state);
        state.error = action.error.message;
      });
    builder.addCase(deleteIncome.fulfilled, (state, action) => {
      state.loading = false;
      const incomeIndex = state.incomes.findIndex(
        (income) => income.id === action.payload
      );
      if (incomeIndex !== -1) {
        state.incomes.splice(incomeIndex, 1);
      }
    });
  },
});

export default incomeSlice.reducer;
