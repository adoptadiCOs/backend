const jwt = require("jsonwebtoken");

// Middleware para validar el token (rutas protegidas)
const verifyToken = (req, res, next) => {
  const accessToken = req.headers["access-token"];

  if (!accessToken) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(accessToken, "ESTOESUNSECRETO"); // TODO: Leer de entorno
    req.username = decoded.username;

    console.log(decoded.username);

    next();
  } catch (error) {
    res.status(400).json({ error: "token no es válido" });
  }
};

module.exports = { verifyToken };
