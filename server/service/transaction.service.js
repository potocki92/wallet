const Transaction = require("../models/transaction.model");

const getTransactions = async (userId) => {
  try {
    const transactions = await Transaction.find({ owner: userId });
    console.log(transactions);
    return transactions;
  } catch (error) {
    console.error("Błąd podczas wyszukiwania transakcji:", error);
    throw error;
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
module.exports = {
  getTransactions,
  addTransactions,
  getTransactionById,
  updateTransactionById,
  removeTransaction,
};
