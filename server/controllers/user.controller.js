const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bCrypto = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");

const User = require("../models/user.model");
const {
  findUserByEmail,
  updateKeyForUser,
  findUserByToken,
} = require("../service/user.service");
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
  try {
    const { value, errorMessage } = userSchema.validate(req.body);
    const { email, password } = value;

    if (errorMessage) {
      return res.status(400).json({ message: errorMessage.message });
    }

    const toLowerCaseEmail = email.toLowerCase();
    const user = await findUserByEmail(toLowerCaseEmail);
    const id = user.id;
    const isPasswordValid = await passwordValid(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
        data: "Unauthorized",
      });
    }

    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await updateKeyForUser({ token }, id);

    return res.json({
      status: "Success",
      code: 200,
      token,
      user: {
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      status: "Error",
      code: 500,
      message: "Server error",
    });
  }
};

const logout = async (req, res, _) => {
  try {
    let token = req.user.token;

    if (!token) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }

    const user = await findUserByToken(token);
    const id = user.id;
    token = null;

    await updateKeyForUser({ token }, id);
    return res.json({
      status: "Success",
      code: 200,
      message: "User successfully logged out",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Server error",
    });
  }
};

const current = async (req, res, _) => {
  try {
    const token = req.user.token;

    if (!token) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }
    const user = await findUserByToken(token);
    return res.json({
      status: "Success",
      code: 200,
      data: {
        currentUser: {
          email: user.email,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Server error",
    });
  }
};
module.exports = {
  signup,
  signin,
  logout,
  current,
};
