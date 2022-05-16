const Router = require("express");

const ForumController = require("../../controllers/forum.controller");

const router = Router();

router.post("/newforum", ForumController.newForum);

router.post("/addreply", ForumController.addComment);

router.delete("/deleteforum", ForumController.deleteSubForum);

router.delete("/deletereply", ForumController.deleteComment);

module.exports = router;