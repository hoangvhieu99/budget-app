import Income from "../models/income.model.js";

export const addIncome = async (req, res, next) => {
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
};

export const getIncomes = async (req, res) => {
  const { id } = req.user;
  try {
    const incomes = await Income.find({ user: id }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteIncome = async (req, res) => {
  const { id } = req.params;
  Income.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
