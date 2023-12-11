const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  expenseName: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
