const Expense = require("../models/expense.model");

const addExpense = async (req, res) => {
  const { expenseName } = req.body;

  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();

    const response = {
      message: `${expenseName} added successfully`,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById({ _id: req.query.id });
    res.status(200).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editExpense = async (req, res) => {
  const { expenseId, expenseName, amount, date, category } = req.body;

  try {
    const expense = await Expense.findById(expenseId);

    expense.expenseName = expenseName;
    expense.amount = amount;
    expense.date = date;
    expense.category = category;
    await expense.save();
    const response = {
      message: `${expenseName} updated successfully`,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllExpense = async (req, res) => {
  try {
    const allExpense = await Expense.find();
    res.status(200).json(allExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    await Expense.deleteOne({ _id: req.query.id });

    res.status(200).json({ message: "expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addExpense,
  getExpense,
  editExpense,
  getAllExpense,
  deleteExpense,
};
