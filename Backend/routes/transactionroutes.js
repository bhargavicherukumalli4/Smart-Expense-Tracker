const express = require("express");

const {
  getTransactions,
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary
} = require("./controllers/transactionController");

const router = express.Router();


// GET all transactions
router.get("/", getTransactions);


// GET summary
router.get("/summary", getSummary);


// GET one transaction
router.get("/:id", getTransaction);


// ADD transaction
router.post("/", addTransaction);


// UPDATE transaction
router.put("/:id", updateTransaction);


// DELETE transaction
router.delete("/:id", deleteTransaction);


module.exports = router;
