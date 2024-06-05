const Income = require("../models/incomeModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongodbId");
const addIncome = asyncHandler(async (req, res, next) => {
  const authToken = req.header("auth-token");
  const { title, amount, category, description, date } = req.body;
  const { id } = req.user;
  const addIncome = new Income({
    user: id,
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //validations;
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await addIncome.save();
    res.status(201).json({ message: "Income Added" });
  } catch (error) {
    // res.status(500).json({ message: "Server Error" });
    next(error);
  }

  console.log(addIncome);
});

const getIncomes = asyncHandler(async (req, res) => {
  // console.log(req.user);
  const { _id } = req.user;
  validateMongoDBId(_id);
  try {
    const incomes = await Income.find({ user: _id }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const deleteIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  Income.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
});

module.exports = {
  addIncome,
  getIncomes,
  deleteIncome,
};
