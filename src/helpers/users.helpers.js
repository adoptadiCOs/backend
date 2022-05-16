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
  return await User.findOne({ email: email, enabled: true });
};

const findUserById = async (id) => {
  return await User.findById({ _id: id, enabled: true });
};

const deleteUserById = async (id) => {
  return await User.findByIdAndUpdate(id, { enabled: false });
};

const findUserAndUpdate = async (id, fieldsToUpdate) => {
  return await User.findByIdAndUpdate(id, fieldsToUpdate, { new: true });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  deleteUserById,
  findUserAndUpdate,
};
