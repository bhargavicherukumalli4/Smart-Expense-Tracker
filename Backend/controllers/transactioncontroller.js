const Transaction = require("./models/transactionModel");

// GET all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transactions",
      error: error.message
    });
  }
};


// GET one transaction
const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transaction",
      error: error.message
    });
  }
};


// ADD transaction
const addTransaction = async (req, res) => {
  try {
    const {
      type,
      amount,
      category,
      description,
      date
    } = req.body;

    if (!type || amount === undefined || !category) {
      return res.status(400).json({
        message: "Type, amount and category are required"
      });
    }

    const transaction = await Transaction.create({
      type,
      amount,
      category,
      description,
      date
    });

    res.status(201).json({
      message: "Transaction added successfully",
      transaction
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add transaction",
      error: error.message
    });
  }
};


// UPDATE transaction
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update transaction",
      error: error.message
    });
  }
};


// DELETE transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    res.status(200).json({
      message: "Transaction deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete transaction",
      error: error.message
    });
  }
};


// GET summary
const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find();

    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });

    const balance = income - expense;

    res.status(200).json({
      totalIncome: income,
      totalExpense: expense,
      balance: balance
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate summary",
      error: error.message
    });
  }
};


module.exports = {
  getTransactions,
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary
};