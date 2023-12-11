const express = require("express");
const expenseController = require("../controller/expenseController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-expense", authenticateToken, expenseController.addExpense);
router.get("/get-expense", authenticateToken, expenseController.getExpense);
router.post("/edit-expense", authenticateToken, expenseController.editExpense);
router.get("/all-expenses", authenticateToken, expenseController.getAllExpense);
router.delete(
  "/delete-expenses",
  authenticateToken,
  expenseController.deleteExpense
);

module.exports = router;
