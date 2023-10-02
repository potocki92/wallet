const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bCrypto = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");

const User = require("../models/user.model");
const { findUserByEmail } = require("../service/user.service");
const SECRET_KEY = process.env.SECRET_KEY;

const userSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(7).required(),
});
const hashPassword = async (password) => {
  const salt = await bCrypto.genSalt(10);
  const hashPassword = await bCrypto.hash(password, salt);
  return hashPassword;
};

const validPassword = (password, hashPassword) =>
  bCrypto.compare(password, hashPassword);

const passwordValid = async (password, userPassword) => {
  const isValid = await validPassword(password, userPassword);
  return isValid;
};
const signup = async (req, res, _) => {
  try {
    const { value, error } = userSchema.validate(req.body);
    const { email, password } = value;

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const toLowerCaseEmail = email.toLowerCase();
    const user = await findUserByEmail(toLowerCaseEmail);

    if (user) {
      return res.status(409).json({
        status: "Error",
        code: 409,
        message: "Email in use",
        data: "Conflict",
      });
    }

    const hashedPassword = await hashPassword(password);

    const verificationToken = uuidv4();
    // send(email, verificationToken);

    await new User({
      email: toLowerCaseEmail,
      password: hashedPassword,
      verificationToken: verificationToken,
    }).save();
    res.status(201).json({
      status: "Created",
      code: 201,
      data: {
        user: {
          email: toLowerCaseEmail,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const signin = async (req, res, _) => {
  res.send("Signin");
};

const logout = async (req, res, _) => {
  res.send("Logout");
};

const current = async (req, res, _) => {
  res.send("Current");
};
module.exports = {
  signup,
  signin,
  logout,
  current,
};
