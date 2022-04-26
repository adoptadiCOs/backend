const User = require("../models/users");

const createUser = async (username, email, password) => {
  const user = new User({
    username: username,
    email: email,
    password: password,
  });

  return await user.save();
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

module.exports = { createUser, findUserByEmail };
