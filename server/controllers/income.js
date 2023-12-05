const Income = require("../models/income");

const addIncome = async (req, res) => {
  const { title, amount, description, category, date } = req.body;
  const newIncome = new Income({
    title,
    amount,
    description,
    category,
    date,
  });
  if (!title || !amount || !category || !date) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    const income = await newIncome.save();
    res.status(201).json({ message: "Income added successfully", income });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getIncome = async (req, res) => {
  try {
    const income = await Income.find().sort({
      createdAt: -1,
    });
    res.status(200).json({ message: "Income fetched successfully", income });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income deleted successfully", income });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addIncome, getIncome, deleteIncome };
