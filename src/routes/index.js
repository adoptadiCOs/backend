const Router = require("express");

const { verifyToken } = require("../middlewares/auth.middleware");

const public_users = require("./users/public");
const private_users = require("./users/private");
const public_pets = require("./pets/public");
const private_pets = require("./pets/private");
const public_statistics = require("./statistics/public");

const public_forum = require("./forum/public");
const private_forum = require("./forum/private");

const router = Router();

router.use("/forum", public_forum);
router.use("/forum", verifyToken, private_forum);

router.use("/users", public_users);
router.use("/users", verifyToken, private_users);

router.use("/", public_pets);
router.use("/", verifyToken, private_pets);

router.use("/", public_statistics);

module.exports = router;
