const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userHelper = require("../helpers/users.helpers");

/* Create user */
const signup = async (req, res) => {
  const { username, email, password, repeatedPassword } = req.body;

  // Comprueba que se le pasan todos los parametros
  if (!username || !email || !password || !repeatedPassword) {
    return res.status(400).json({ error: "Introduce todos los campos." });
  }

  // Comprueba si el email es válido
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Dirección de correo inválida." });
  }

  // Comprueba que las contraseñas son iguales
  if (password !== repeatedPassword) {
    return res
      .status(400)
      .json({ error: "Las contraseñas no coinciden. Inténtalo de nuevo." });
  }

  // Cifra la contraseña
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Comprueba que no exista un usuario con el mismo nombre/email. Y crea la cuenta
  try {
    await userHelper.createUser(username, email, hash);

    return res.status(201).json({ message: "Cuenta creada correctamente" });
  } catch (error) {
    return res.status(400).send({
      error: "Ese usuario/correo ya está en uso. Prueba con otro.",
    });
  }
};

/* Logs user into the system */
const login = async (req, res) => {
  const { email, password } = req.body;

  // Comprueba que se le pasan todos los parametros
  if (!email || !password) {
    return res.status(400).json({ error: "Introduce todos los campos." });
  }

  // Comprueba si el email es válido
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Dirección de correo inválida." });
  }

  // Comprueba si existe un usuario con ese email. Y obtiene la cuenta
  try {
    var user = await userHelper.findUserByEmail(email);

    if (!user) {
      return res
        .status(400)
        .json({ error: "No se ha podido encontrar tú cuenta." });
    }
  } catch (error) {
    return res.status(500).json({});
  }

  // Comprueba que las contraseñas son iguales
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res
      .status(400)
      .json({ error: "Contraseña incorrecta. Vuelve a intentarlo" });
  }

  const accessToken = jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    process.env.SECRET
  );

  return res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    bio: user.bio,
    avatar: user.avatar,
    createdAt: user.createdAt,
    accessToken: accessToken,
  });
};

/* Logs out the current user  */
const logout = async (_, res) => {
  return res.status(200).json({ message: "Sesión cerrada correctamente" });
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

    return res.status(200).json({
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
      return res
        .status(400)
        .json({ error: "el usuario no ha podido eliminarse" });
    }
    return res.status(200).json({});
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
