const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Transaction date is required"],
    },
    income: {
      type: Boolean,
      required: [true, "Transaction income is required"],
      default: false,
    },
    categories: {
      type: String,
      required: [true, "Transaction category is required"],
    },
    comment: {
      type: String,
    },
    sum: {
      type: Number,
      required: [true, "Transaction amount is required"],
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Transaction = new mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
