const User = require("../models/user.model");

const findUserByEmail = async (email) => await User.findOne({ email });
const findUserByToken = async (token) => await User.findOne({ token });
const updateKeyForUser = async (field, id) => {
  await User.findByIdAndUpdate({ _id: id }, field, { new: true });
};

module.exports = {
  findUserByEmail,
  findUserByToken,
  updateKeyForUser,
};
