const User = require("../models/user.model");

const findUserByEmail = async (email) => await User.findOne({ email });

module.exports = {
  findUserByEmail,
};
