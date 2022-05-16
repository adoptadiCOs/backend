const Router = require("express");

const ForumController = require("../../controllers/forum.controller");

const router = Router();

router.get("/forums", ForumController.listSubForum);

router.get("/forumcategory", ForumController.listSubForumByCategory);

router.get("/forum", ForumController.getSubForum);

module.exports = router;
