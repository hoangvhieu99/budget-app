import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://localhost:3000/api/transactions/";
const initialState = {
  incomes: [
    {
      id: "663dcd9b7f0ddaa219eb3279",
      title: "Test 3",
      amount: 1000000,
      type: "income",
      date: "2024-04-02T17:00:00.000Z",
      category: "Doi No",
      description: "No",
      user: "663dccd57f0ddaa219eb3276",
    },
  ],
  error: null,
  loading: false,
};

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (incomeData) => {
    try {
      const response = await axios.post(`${BASE_URL}add-income`, incomeData);
      return response.data.response;
    } catch (error) {
      return Promise.reject(error.response.data.message);
    }
  }
);

export const getIncomes = createAsyncThunk("income/getIncomes", async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}get-incomes`, {
      params: {
        id,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
});

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
export const selectTotalIncome = (state) =>
  state.income.incomes.reduce((acc, income) => acc + income.amount, 0);

export default incomeSlice.reducer;
