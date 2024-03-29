const User = require("../models/users");

const createUser = async (user) => {
  return await User.create(user);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email, enabled: true });
};

const findUserByName = async (username) => {
  return await User.findOne({ username: username, enabled: true });
};

const findUserById = async (id) => {
  return await User.findById({ _id: id, enabled: true });
};

const deleteUserById = async (id) => {
  return await User.findByIdAndUpdate(id, { enabled: false });
};

const updateBio = async (id, bio) => {
  return await User.findByIdAndUpdate(id, { bio: bio }, { new: true });
};

const updatePassword = async (id, password) => {
  return await User.updateOne({ _id: id }, { password: password });
};

const updateUsername = async (id, username) => {
  return await User.findByIdAndUpdate(
    id,
    { username: username },
    { new: true }
  );
};

const updateAvatar = async (id, avatar) => {
  return await User.findByIdAndUpdate(id, { avatar: avatar }, { new: true });
};

const findAll = async () => {
  return await User.find({ enabled: true }).select({
    _id: 0,
    id: "$_id",
    username: 1,
    avatar: 1,
    role: 1,
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByName,
  findUserById,
  deleteUserById,
  updateBio,
  updatePassword,
  updateUsername,
  updateAvatar,
  findAll,
};
