const User = require("../models/users");

const createUser = async (username, email, password) => {
  return await User.create({
    username: username,
    email: email,
    password: password,
  });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const findUserById = async (id) => {
  return await User.findById({ _id: id });
};

const deleteUserById = async (id) => {
  return await User.deleteOne({ _id: id });
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
