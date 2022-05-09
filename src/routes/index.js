const Router = require("express");

const userRoutes = require("./users.routes");
const public_pets = require("./pets/public");
const private_pets = require("./pets/private");
const public_statistics = require("./statistics/public");

const router = Router();

router.use("/users", userRoutes);
router.use("/", public_pets);
router.use("/", private_pets);
router.use("/", public_statistics);

module.exports = router;
