import express from "express";
import {
  addExpense,
  getExpense,
  deleteExpense,
} from "../controllers/expense.controller.js";
import {
  addIncome,
  getIncomes,
  deleteIncome,
} from "../controllers/income.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/get-incomes", verifyToken, getIncomes);
router.post("/add-income", verifyToken, addIncome);
router.get("/get-expenses", verifyToken, getExpense);
router.delete("/delete-income/:id", verifyToken, deleteIncome);
router.post("/add-expense", verifyToken, addExpense);
router.delete("/delete-expense/:id", verifyToken, deleteExpense);

export default router;
