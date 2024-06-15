import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://localhost:5000/api/income/";
const initialState = {
  incomes: [],
  error: null,
  loading: false,
  getTotalIncome: 0,
};

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (incomeData) => {
    try {
      const response = await axios.post(`${BASE_URL}add-income`, incomeData, {
        headers: { Authorization: incomeData.token },
      });
      return response.data;
    } catch (error) {
      return Promise.reject(error.response.data.message);
    }
  }
);

export const getIncomes = createAsyncThunk(
  "income/getIncomes",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`, {
        headers: { Authorization: token },
      });

      return response.data;
    } catch (error) {
      // return Promise.reject(error.response.data.message);
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Network Error" });
      }
    }
  }
);

export const deleteIncome = createAsyncThunk(
  "income/deleteIncome",
  async (data) => {
    // console.log(data);
    try {
      await axios.delete(`${BASE_URL}delete-income/${data.id}`, {
        headers: { Authorization: data.token },
      });
      return data.id; // Return the deleted income ID for potential UI updates
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
      .addCase(getIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIncomes.fulfilled, (state, action) => {
        state.loading = false;
        // state.incomes = action.payload;
        state.incomes = action.payload.filter((item) => item != null);
        state.getTotalIncome = state.incomes.reduce(
          (acc, income) => acc + income.amount,
          0
        );
      })
      .addCase(getIncomes.rejected, (state, action) => {
        state.loading = false;
        state.incomes = [];
        state.error = action.error.message;
      });
    builder
      .addCase(deleteIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.loading = false;
        const incomeIndex = state.incomes.findIndex(
          (income) => income.id === action.payload
        );
        if (incomeIndex !== -1) {
          state.incomes.splice(incomeIndex, 1);
        }
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.loading = false;
        state.incomes = [];
        state.error = action.error.message;
      });
  },
});

export default incomeSlice.reducer;
