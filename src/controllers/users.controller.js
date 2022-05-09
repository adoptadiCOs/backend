const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userHelper = require("../helpers/users.helpers");

/* Create user */
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  // TODO: Validación de parámetros

  try {
    // Cifra la contraseña
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await userHelper.createUser(username, email, hash);

    res.status(200).json({});
  } catch (error) {
    return res.status(500).send(error);
  }
};

/* Logs user into the system */
const login = async (req, res) => {
  // TODO: Validación de parámetros

  const { email, password } = req.body;

  try {
    const user = await userHelper.findUserByEmail(email);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "contraseña no válida" });
    }

    // TODO: Generar jwt
    const accessToken = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.SECRET
    );

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      bio: user.bio,
      avatar: user.avatar,
      createdAt: user.createdAt,
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

/* Logs out the current user  */
const logout = async (_, res) => {
  res.status(200).json({});
};

/* Update user */
const updateUser = async (req, res) => {
  const { id, bio, avatar } = req.body;

  let fieldsToUpdate = {};

  if (bio !== undefined) {
    fieldsToUpdate["bio"] = bio;
  }

  if (avatar !== undefined) {
    fieldsToUpdate["avatar"] = avatar;
  }

  try {
    var user = await userHelper.findUserAndUpdate(id, fieldsToUpdate);

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      bio: user.bio,
      avatar: user.avatar,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

/* Delete user */
const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    const { deletedCount } = await userHelper.deleteUserById(id);

    if (deletedCount == 0) {
      res.status(400).json({ error: "el usuario no ha podido eliminarse" });
    }
    res.status(200).json({});
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  updateUser,
  deleteUser,
};
