const Router = require("express");

const ForumController = require("../../controllers/forum.controller");
const { isAdmin } = require("../../middlewares/auth.middleware");

const router = Router();

router.post("/new", ForumController.newForum);

router.post("/reply", ForumController.addComment);

router.delete("/delete", ForumController.deleteSubForum);

router.delete("/deletereply", ForumController.deleteComment);

module.exports = router;
