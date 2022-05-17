const Router = require("express");

const ForumController = require("../../controllers/forum.controller");

const router = Router();

/**
 * @swagger
 * /forum/list:
 *  post:
 *    tags:
 *      - forum
 *    summary: List active forums
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: A list of enabled forums
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example: 
 *                - user: "user1"
 *                  title: "title1"
 *                  user_explanation: "description1"
 *      500:
 *        description: Error of the server
 */

router.get("/list", ForumController.listSubForum);

router.get("/category", ForumController.listSubForumByCategory);

router.get("/", ForumController.getSubForum);

module.exports = router;
