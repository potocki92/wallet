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
} = require("../service/transaction.service");
const SECRET_KEY = process.env.SECRET_KEY;

const transactionGet = async (req, res, next) => {
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
    const { name, color } = req.body;

    const schema = Joi.object({
      name: Joi.string().required(),
      color: Joi.string().required(),
    });

    const { error } = schema.validate({ name, color });

    if (error) {
      res.status(400).json({
        message: `missing required ${error} - field`,
      });
      return;
    }

    const newTransaction = await addTransactions(name, color, req.user._id);
    res.status(200).json(newTransaction);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  transactionGet,
  createTransaction,
};
