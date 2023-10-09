const Transaction = require("../models/transaction.model");

const getTransactions = async (userId) => {
  try {
    const transactions = await Transaction.find({ owner: userId });
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
module.exports = { getTransactions, addTransactions, getTransactionById };
