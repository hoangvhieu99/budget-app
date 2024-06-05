const express = require("express");
const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controller/expenseCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();
router.get("/get-expenses", getExpense);
router.post("/add-expense", authMiddleware, addExpense);
router.delete("/delete-expense/:id", authMiddleware, deleteExpense);

module.exports = router;
