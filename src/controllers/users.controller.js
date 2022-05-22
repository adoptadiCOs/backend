const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userHelper = require("../helpers/users.helpers");

const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

let gfs;

const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
});

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
    return res.status(409).send({
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
        .status(404)
        .json({ error: "No se ha podido encontrar tú cuenta." });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
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
  // ? Solo para posibles estadisticas
  return res.status(200).json({ message: "Tú sesión ha sido finalizada" });
};

/* Update avatar */
const updateAvatar = async (req, res) => {
  const file = req.file;
  const { id } = req.user;

  if (!file) {
    return res.status(400).json({ error: "Debes añadir una imagen." });
  }

  try {
    var user = await userHelper.updateAvatar(id, file.filename);

    if (!user) {
      return res
        .status(404)
        .json({ error: "No se ha podido encontrar tú cuenta." });
    }

    return res.status(200).json({ avatar: user.avatar });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getAvatar = async (req, res) => {
  const { id: avatar } = req.params;

  try {
    const file = await gfs.files.findOne({ filename: avatar });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Avatar no encontrado" });
  }
};

/* Update biography */
const updateBio = async (req, res) => {
  const { id, bio } = req.body;

  if (!bio) {
    return res.status(400).json({ error: "Requiere una nueva biografía" });
  }

  try {
    var user = await userHelper.updateBio(id, bio);

    if (!user) {
      return res
        .status(404)
        .json({ error: "No se ha podido encontrar tú cuenta." });
    }

    return res.status(200).json({ bio: user.bio });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

/* Update password */
const updatePassword = async (req, res) => {
  const { id, password, newPassword, repeatedNewPassword } = req.body;

  // Comprueba que se le pasan todos los parametros
  if (!password || !newPassword || !repeatedNewPassword) {
    return res.status(400).json({ error: "Introduce todos los campos." });
  }

  try {
    var user = await userHelper.findUserById(id);

    if (!user) {
      return res
        .status(404)
        .json({ error: "No se ha podido encontrar tú cuenta." });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }

  // Comprueba que la contraseña es correcta
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res
      .status(400)
      .json({ error: "Contraseña incorrecta. Vuelve a intentarlo" });
  }

  // Comprueba que las nuevas contraseñas sean iguales
  if (newPassword !== repeatedNewPassword) {
    return res.status(400).json({
      error: "Las nuevas contraseñas no coinciden. Inténtalo de nuevo.",
    });
  }

  // Cifra la contraseña
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  //Actualiza la contraseña
  try {
    await userHelper.updatePassword(id, hash);

    return res.status(200).json({ message: "Tú contraseña ha sido cambiada" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

/* Delete user */
const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedUser = await userHelper.deleteUserById(id);

    if (!deletedUser) {
      return res
        .status(400)
        .json({ error: "No se ha podido eliminar tú cuenta" });
    }
    return res.status(200).json({ message: "Tú cuenta ha sido eliminada" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateUsername = async (req, res) => {
  const { id, newUsername } = req.body;

  if (!newUsername) {
    return res
      .status(400)
      .json({ error: "Requiere un nuevo nombre de usuario" });
  }

  try {
    var user = await userHelper.updateUsername(id, newUsername);

    if (!user) {
      return res
        .status(404)
        .json({ error: "No se ha podido encontrar tú cuenta." });
    }

    const accessToken = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.SECRET
    );

    return res
      .status(200)
      .json({ username: user.username, accessToken: accessToken });
  } catch (error) {
    return res.status(409).send({
      error: "Ese usuario ya está en uso. Prueba con otro.",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userHelper.findAll();

    return res.status(200).json({ users: users });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const banUser = async (req, res) => {
  const { id } = req.params;

  try {
    var user = await userHelper.findUserById(id);

    if (!user) {
      return res
        .status(404)
        .json({ error: "No se ha podido encontrar tú cuenta." });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        error: "No está permitido eliminar la cuenta de un administrador.",
      });
    }

    const deletedUser = await userHelper.deleteUserById(id);

    if (!deletedUser) {
      return res
        .status(400)
        .json({ error: "No se ha podido eliminar tú cuenta" });
    }

    return res
      .status(200)
      .json({ message: "La cuenta ha sido sido eliminada" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getUserInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userHelper.findUserById(id);

    if (!user) {
      return res
        .status(404)
        .json({ error: "No se ha podido encontrar el usuario." });
    }

    return res.status(200).json({
      id: user._id,
      username: user.username,
      role: user.role,
      bio: user.bio,
      avatar: user.avatar,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  signup,
  login,
  logout,
  updateAvatar,
  getAvatar,
  deleteUser,
  updateBio,
  updatePassword,
  updateUsername,
  getUsers,
  banUser,
  getUserInfo,
};
