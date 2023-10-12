const Joi = require("joi");
const dotenv = require("dotenv");
dotenv.config();
const {
  getTransactions,
  addTransactions,
  getTransactionById,
  updateTransactionById,
  removeTransaction,
  getExpenses,
  getIncome,
} = require("../service/transaction.service");
const { getStatistics } = require("../utils/getStatistics");

const getCurrentMonthTransactions = async (req, res, next) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  try {
    const transaction = await getTransactions(
      req.user._id,
      currentMonth,
      currentYear
    );
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
};

const createTransaction = async (req, res, next) => {
  try {
    const { date, income, category, comment, sum } = req.body;

    const schema = Joi.object({
      date: Joi.date().required(),
      income: Joi.boolean().required(),
      category: Joi.string().required(),
      comment: Joi.string(),
      sum: Joi.number().required(),
    });

    const { error } = schema.validate({ date, income, category, comment, sum });

    if (error) {
      res.status(400).json({
        message: `missing required ${error} - field`,
      });
      return;
    }

    const newTransaction = await addTransactions(
      date,
      income,
      category,
      comment,
      sum,
      req.user._id
    );
    res.status(200).json(newTransaction);
  } catch (err) {
    next(err);
  }
};

const getTransaction = async (req, res, next) => {
  try {
    const transaction = await getTransactionById(req.params.id, req.user._id);
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const {
      user,
      body,
      params: { id },
    } = req;

    const schema = Joi.object({
      date: Joi.date(),
      category: Joi.string(),
      comment: Joi.string(),
      sum: Joi.number(),
    });

    const { error } = schema.validate(body);

    if (error) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const updateTransaction = await updateTransactionById(user._id, id, body);
    res.status(200).json(updateTransaction);
  } catch (err) {
    if (err.message === "Transaction not found") {
      res.status(404).json({ message: "Transaction not found" });
    }
    naxt(err);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    await removeTransaction(transactionId);
    res.status(200).json({ message: "transaction deleted successfully" });
  } catch (err) {
    if (err.message === "Transaction not found") {
      res.status(404).json({ message: "Transaction not found" });
    } else {
      next(err);
    }
  }
};

const getStatsTransactions = async (req, res, next) => {
  const { year, month } = req.params;

  try {
    const transaction = await getTransactions(
      req.user.id,
      parseInt(month),
      parseInt(year)
    );

    const data = await getStatistics(transaction, req.user.id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getBalanceTransactions = async (req, res, next) => {
  try {
    const expensesArray = await getExpenses(req.user.id);
    const incomeArray = await getIncome(req.user.id);

    const expenses = expensesArray.length > 0 ? expensesArray[0].expenses : 0;
    const income = incomeArray.length > 0 ? incomeArray[0].income : 0;

    res.status(200).json({
      status: "success",
      code: 200,
      data: { expenses, income, balance: income - expenses },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports = {
  getCurrentMonthTransactions,
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getStatsTransactions,
  getBalanceTransactions,
};
