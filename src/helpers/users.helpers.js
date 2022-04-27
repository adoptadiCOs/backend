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

const deleteUserById = async (id) => {
  return await User.deleteOne({ _id: id });
};

const findUserAndUpdate = async (id, fieldsToUpdate) => {
  return await User.findByIdAndUpdate(id, fieldsToUpdate, { new: true });
};

module.exports = {
  createUser,
  findUserByEmail,
  deleteUserById,
  findUserAndUpdate,
};
