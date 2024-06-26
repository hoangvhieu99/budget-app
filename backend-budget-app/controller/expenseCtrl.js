const Expense = require("../models/expenseModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongodbId");

const addExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const { id } = req.user;
  const addExpense = new Expense({
    user: id,
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await addExpense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(addExpense);
});

const getExpense = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDBId(id);
  try {
    const incomes = await Expense.find({ user: id }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  Expense.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Expense Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
});
module.exports = {
  addExpense,
  getExpense,
  deleteExpense,
};
