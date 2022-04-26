const userHelper = require("../helpers/users.helpers");

/* Create user */
const signup = async (req, res) => {
  // TODO: Validación de parámetros

  try {
    const { username, email, password, repeatedPassword } = req.body;
    console.log(username, email, password, repeatedPassword);

    const user = await userHelper.createUser(username, email, password);

    // TODO: Generar jwt
    let accessToken = "aunnolohehechoimpacientes";

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

/* Logs user into the system */
const login = async (_, res) => {
  res.send("Login route");
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
