const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
      default: "income",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", IncomeSchema);
