const express = require("express");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controller/incomeCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();
router.get("/get-incomes", authMiddleware, getIncomes);
router.post("/add-income", authMiddleware, addIncome);
router.delete("/delete-income/:id", authMiddleware, deleteIncome);
module.exports = router;
