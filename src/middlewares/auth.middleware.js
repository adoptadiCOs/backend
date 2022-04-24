//TODO: check JWT session
const AuthMiddleware = (req, res, next) => {
  next();
};

module.exports = { AuthMiddleware };
