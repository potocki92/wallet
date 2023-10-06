const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bCrypto = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");

const Category = require("../models/category.model");
const {
  addCategories,
  getCategories,
} = require("../service/categories.service");

const categoriesGet = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const categories = await getCategories(userId);
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};
const createCategories = async (req, res, next) => {
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

    const newCategory = await addCategories(name, color, req.user._id);
    res.status(200).json(newCategory);
  } catch (err) {
    next(err);
  }
};

module.exports = { categoriesGet, createCategories };
