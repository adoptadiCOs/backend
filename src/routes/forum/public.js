const Router = require("express");

const ForumController = require("../../controllers/forum.controller");

const router = Router();

router.get("/list", ForumController.listSubForum);

router.get("/category", ForumController.listSubForumByCategory);

router.get("/", ForumController.getSubForum);

module.exports = router;
