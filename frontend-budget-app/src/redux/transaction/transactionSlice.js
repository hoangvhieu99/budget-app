import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incomes: [],
  expenses: [],
  loading: false,
  error: false,
  totalIncome: 0,
  totalExpenses: 0,
};
export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addIncome: (state, action) => {
      state.incomes = action.payload;
      state.totalIncome = state.incomes.reduce(
        (total, income) => total + income.amount,
        0
      );
      state.loading = false;
      state.error = false;
    },
    getIncomes: (state, action) => {
      state.incomes = action.payload;
      state.loading = false;
      state.error = false;
    },
    deleteIncome: (state) => {
      state.incomes = state.incomes.filter(
        (income) => income.id !== action.payload
      );
      state.totalIncome = state.incomes.reduce(
        (total, income) => total + income.amount,
        0
      );
      state.loading = false;
      state.error = false;
    },

    addExpense: (state, action) => {
      state.expenses = action.payload;
      state.totalExpenses = state.expenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );
      state.loading = false;
      state.error = false;
    },
    getExpenses: (state, action) => {
      state.expenses = action.payload;
      state.loading = false;
      state.error = false;
    },
    deleteExpense: (state) => {
      state.incomes = state.incomes.filter(
        (income) => income.id !== action.payload
      );
      state.totalIncome = state.incomes.reduce(
        (total, income) => total + income.amount,
        0
      );
      state.loading = false;
      state.error = false;
    },
    calculateTotalIncome: (state) => {
      state.totalIncome = state.incomes.reduce(
        (total, income) => total + income.amount,
        0
      );
    },
    // Reducer for calculating total expenses
    calculateTotalExpenses: (state) => {
      state.totalExpenses = state.expenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );
    },
  },
});
export const {
  addIncome,
  getIncomes,
  deleteIncome,

  addExpense,
  getExpenses,
  deleteExpense,

  calculateTotalIncome,
  calculateTotalExpenses,
} = transactionSlice.actions;

export default transactionSlice.reducer;
