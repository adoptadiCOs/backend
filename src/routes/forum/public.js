const Router = require("express");

const ForumController = require("../../controllers/forum.controller");

const router = Router();

/* List all enabled forums */
/**
 * @swagger
 * /forum/list:
 *  get:
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
 *                  id: "asdasfderttertwt3456345"
 *                  user_explanation: "description1"
 *      500:
 *        description: Error of the server
 */

router.get("/list", ForumController.listSubForum);

/**
 * @swagger
 * /forum/category:
 *  get:
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
 *                  id: "asdasfderttertwt3456345"
 *                  user_explanation: "description1"
 *                  category: "cats"
 *      400:
 *        description: No enough parameters
 *      500:
 *        description: Error of the server
 */
router.get("/category", ForumController.listSubForumByCategory);

/**
 * @swagger
 * /forum:
 *  get:
 *    tags:
 *      - forum
 *    summary: Get all information about one forum
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: forumx
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            owner:
 *              type: string
 *            title:
 *              type: string
 *          example:
 *            owner: "user1"
 *            title: "title1"
 *    responses:
 *      201:
 *        description: A list of enabled forums
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                - user: "user1"
 *                  title: "title1"
 *                  id: "asdasfderttertwt3456345"
 *                  user_explanation: "description1"
 *                  date: "2022-05-17T08:59:49.802Z"
 *                  createdAt: "2022-05-17T08:59:49.802Z"
 *                  updatedAt: "2022-05-17T08:59:49.802Z"
 *                  replies: [ { user: "user1",
 *                             id: "asdasfderttertwt3456346",
 *                             reply: "reply1",
 *                             reply_date: "2022-05-17T09:00:02.265Z" } ]
 *      400:
 *        description: No enough parameters
 *      404:
 *        description: Forum not found
 *      500:
 *        description: Error of the server
 */

router.get("/", ForumController.getSubForum);

module.exports = router;
