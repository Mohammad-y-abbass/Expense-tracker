const Expense = require("../models/expense");

const addExpense = async (req, res) => {
  const { title, amount, note, category, date } = req.body;
  const newExpense = new Expense({
    title,
    amount,
    note,
    category,
    date,
  });
  if (!title || !amount || !category || !date) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    const expense = await newExpense.save();
    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getExpense = async (req, res) => {
  try {
    const expense = await Expense.find().sort({
      createdAt: -1,
    });
    res.status(200).json({ message: "Expense fetched successfully", expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(400).json({ msg: "No expense found" });
    res.status(200).json({ message: "Expense deleted successfully", expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addExpense, getExpense, deleteExpense };
