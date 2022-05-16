const Router = require("express");

const userRoutes = require("./users.routes");

const public_forum = require("./forum/public");
const private_forum = require("./forum/private");

const router = Router();

router.use("/users", userRoutes);

router.use("/forum", public_forum);
router.use("/forum", private_forum);

module.exports = router;
