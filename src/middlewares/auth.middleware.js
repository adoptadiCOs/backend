const jwt = require("jsonwebtoken");

// Middleware para validar el token (rutas protegidas)
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader === "undefined") {
    return res.status(403).send({ message: "No token provided" });
  }

  // Extrae el token
  let accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, process.env.SECRET); // TODO: Leer de entorno

    // Añade al cuerpo los valores decodificados
    req.body = { ...req.body, username: decoded.username, id: decoded.id };

    next();
  } catch (error) {
    res.status(400).json({ error: "token no es válido" });
  }
};

module.exports = { verifyToken };
