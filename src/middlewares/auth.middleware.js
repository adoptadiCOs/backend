const jwt = require("jsonwebtoken");

const userHelper = require("../helpers/users.helpers");

// Middleware para validar el token (rutas protegidas)
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader === "undefined") {
    return res.status(401).send({ message: "Token necesario" });
  }

  // Extrae el token
  let accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, process.env.SECRET);

    // Añade al cuerpo los valores decodificados
    req.body = { ...req.body, username: decoded.username, id: decoded.id };

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

const isAdmin = async (req, res, next) => {
  const { id } = req.body;

  const user = await userHelper.findUserById(id);

  if (user.role === "admin") {
    return next();
  }

  return res.status(403).send({ error: "Requiere rol de administrador" });
};

module.exports = { verifyToken, isAdmin };
