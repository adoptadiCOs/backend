const Router = require("express");

const userRoutes = require("./users.routes");

const router = Router();

router.use("/users", userRoutes);

module.exports = router;
