const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userHelper = require("../helpers/users.helpers");

/* Create user */
const signup = async (req, res) => {
  // TODO: Validación de parámetros
  const { username, email, password } = req.body;

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
      "ESTOESUNSECRETO" // TODO: Leer de entorno
    );

    console.log(accessToken);

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

/* Logs out the current user  */
const logout = async (_, res) => {
  res.send("Logout route");
};

/* Update user */
const updateUser = async (_, res) => {
  res.send("Update user route");
};

/* Delete user */
const deleteUser = async (_, res) => {
  res.send("Delete user route");
};

module.exports = {
  signup,
  login,
  logout,
  updateUser,
  deleteUser,
};
