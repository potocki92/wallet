const { mongoose } = require("mongoose");
const Transaction = require("../models/transaction.model");

const getTransactions = async (userId, month, year) => {
  const ObjectId = mongoose.Types.ObjectId;
  const userIdAsObjectId = new ObjectId(userId);

  try {
    const transactions = await Transaction.aggregate([
      {
        $match: {
          owner: userIdAsObjectId,
          $expr: {
            $and: [
              { $eq: [{ $month: "$date" }, month] },
              { $eq: [{ $year: "$date" }, year] },
            ],
          },
        },
      },
      { $project: { createdAt: 0, updatedAt: 0, owner: 0 } },
      { $sort: { date: -1 } },
    ]);
    return transactions;
  } catch (err) {
    next(err);
  }
};

const addTransactions = async (date, income, category, comment, sum, owner) => {
  try {
    const newTransaction = await Transaction.create({
      date: date,
      income: income,
      categories: category,
      comment: comment,
      sum: sum,
      owner: owner,
    });

    return newTransaction;
  } catch (error) {
    console.error("Error during add transaction:", error);
    throw error;
  }
};

const getTransactionById = async (transactionId, ownerId) => {
  try {
    const transaction = await Transaction.findOne({
      owner: ownerId,
      _id: transactionId,
    });

    if (!transaction) {
      const error = new Error("Transaction not found or unauthorized.");
      error.status = 404;
      throw error;
    } else {
      console.log("Transaction found:", transaction);
      return transaction;
    }
  } catch (error) {
    console.error("Error during get transaction:", error);
    throw error;
  }
};

const updateTransactionById = async (userId, transactionId, body) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      { owner: userId, _id: transactionId },
      body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return transaction;
  } catch (err) {
    console.error("Error during update transaction:", err);
    throw err;
  }
};

const removeTransaction = async (transactionId) => {
  const transaction = await Transaction.findByIdAndDelete(transactionId);

  if (!transaction) {
    throw new Error("Transaction not found");
  }
  return transaction;
};

const getExpenses = async (userId) => {
  const ObjectId = mongoose.Types.ObjectId;
  const userIdAsObjectId = new ObjectId(userId);

  const pipeline = [
    {
      $match: {
        owner: userIdAsObjectId,
        income: false,
      },
    },
    {
      $group: {
        _id: "$owner",
        expenses: {
          $sum: "$sum",
        },
      },
    },
    { $project: { _id: 0 } },
  ];

  const result = Transaction.aggregate(pipeline);

  return result;
};

const getIncome = async (userId) => {
  const ObjectId = mongoose.Types.ObjectId;
  const userIdAsObjectId = new ObjectId(userId);

  const pipeline = [
    {
      $match: {
        owner: userIdAsObjectId,
        income: true,
      },
    },
    {
      $group: {
        _id: "$owner",
        income: {
          $sum: "$sum",
        },
      },
    },
    { $project: { _id: 0 } },
  ];

  const result = Transaction.aggregate(pipeline);

  return result;
};
module.exports = {
  getTransactions,
  addTransactions,
  getTransactionById,
  updateTransactionById,
  removeTransaction,
  getExpenses,
  getIncome,
};
