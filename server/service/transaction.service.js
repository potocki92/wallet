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

const addTransactions = async (name, color, owner) => {
  try {
    const newTransaction = await Transaction.create({
      name: name,
      color: color,
      owner: owner,
    });

    return newTransaction;
  } catch (error) {
    console.error("Error during add transaction:", error);
    throw error;
  }
};
module.exports = { getTransactions, addTransactions };
