const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bCrypto = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");

const Transaction = require("../models/transaction.model");
const {
  getTransactions,
  addTransactions,
  getTransactionById,
} = require("../service/transaction.service");
const SECRET_KEY = process.env.SECRET_KEY;

const allTransactions = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const transaction = await getTransactions(userId);
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
module.exports = {
  allTransactions,
  createTransaction,
  getTransaction,
};
