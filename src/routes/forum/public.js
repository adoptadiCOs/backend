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
 *                  user_explanation: "description1"
 *                  id: "6286bf884cb06d5a3c7bddda"
 *                  createdAt: "2022-05-19T22:12:58.080Z"
 *                  updatedAt: "2022-05-19T22:12:58.080Z"
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
 *        description: A list of enabled forums with specified category
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example:
 *                - user: "user1"
 *                  title: "title1"
 *                  user_explanation: "description1"
 *                  category: "cats"
 *                  id: "6286bf884cb06d5a3c7bddda"
 *                  createdAt: "2022-05-19T22:12:58.080Z"
 *                  updatedAt: "2022-05-19T22:12:58.080Z"
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
 *            id_forum: "6286bf884cb06d5a3c7bddda"
 *    responses:
 *      201:
 *        description: Get all information of a forum
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                - user: "user1"
 *                  title: "title1"
 *                  user_explanation: "description1"
 *                  id: "6286bf884cb06d5a3c7bddda"
 *                  createdAt: "2022-05-19T22:12:58.080Z"
 *                  updatedAt: "2022-05-19T22:12:58.080Z"
 *                  replies: [ { user: "user1",
 *                             reply: "reply1",
 *                             id: "6286c608be23981510abb356",
 *                             reply_date: "2022-05-17T09:00:02.265Z" } ]
 *      400:
 *        description: No enough parameters
 *      404:
 *        description: Forum not found
 *      500:
 *        description: Error of the server
 */

router.get("/", ForumController.getSubForum);

/**
 * @swagger
 * /forum/admin/numberofforums:
 *  get:
 *    tags:
 *      - forum
 *    summary: Gets the number of forums
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    responses:
 *      201:
 *        description: Returns the number of active forums
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                - data: 4
 */
 router.get("/admin/numberofforums", ForumController.numberOfForums);

module.exports = router;
