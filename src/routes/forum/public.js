const Router = require("express");

const ForumController = require("../../controllers/forum.controller");

const router = Router();

/* List all enabled forums */
/**
 * @swagger
 * /forum/list:
 *  post:
 *    tags:
 *      - forum
 *    summary: List forums
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

/**
 * @swagger
 * /forum/category:
 *  post:
 *    tags:
 *      - forum
 *    summary: List forums by a category
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: category
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            category:
 *              type: string
 *          example:
 *            category: "cats"
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
 *                  category: "cats"
 *      500:
 *        description: Error of the server
 */
router.get("/category", ForumController.listSubForumByCategory);

router.get("/", ForumController.getSubForum);

module.exports = router;
