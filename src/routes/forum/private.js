const Router = require("express");

const ForumController = require("../../controllers/forum.controller");
const { isAdmin } = require("../../middlewares/auth.middleware");

const router = Router();

/**
 * @swagger
 * /forum/new:
 *  post:
 *    tags:
 *      - forum
 *    summary: Create a new forum
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "titulo1"
 *               user_explanation:
 *                 type: string
 *                 example: "comment1"
 *               category:
 *                 type: string
 *                 example: "gatos"
 *    responses:
 *      201:
 *        description: Info about the created forum
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
 *      400:
 *        description: No enough parameters
 *      409:
 *        description: A forum with the same title was created before by the same user
 *      500:
 *        description: Error of the server
 */
router.post("/new", ForumController.newForum);

/**
 * @swagger
 * /forum/reply:
 *  post:
 *    tags:
 *      - forum
 *    summary: Add a reply to some forum
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_forum:
 *                 type: string
 *                 example: "2334523452345234"
 *               comment:
 *                 type: string
 *                 example: "comment1"
 *    responses:
 *      201:
 *        description: Added the comment
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
 *      409:
 *        description: Forum does not exits
 *      500:
 *        description: Error of the server
 */
router.post("/reply", ForumController.addComment);

/**
 * @swagger
 * /forum/admin/delete:
 *  delete:
 *    tags:
 *      - forum
 *    summary: Delete forum as admin
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_forum:
 *                 type: string
 *                 example: "2334523452345234"
 *    responses:
 *      201:
 *        description: Forum deleted
 *      400:
 *        description: No enough parameters
 *      409:
 *        description: Forum does not exits
 *      500:
 *        description: Error of the server
 */
router.delete("/admin/delete", isAdmin, ForumController.deleteSubForumAdmin);

/**
 * @swagger
 * /forum/delete:
 *  delete:
 *    tags:
 *      - forum
 *    summary: Delete forum as regular user (only can be deleted forums that the user owns)
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_forum:
 *                 type: string
 *                 example: "2334523452345234"
 *    responses:
 *      201:
 *        description: Forum deleted
 *      400:
 *        description: No enough parameters
 *      409:
 *        description: Forum does not exits
 *      500:
 *        description: Error of the server
 */
router.delete("/delete", ForumController.deleteSubForum);

/**
 * @swagger
 * /forum/admin/deletereply:
 *  delete:
 *    tags:
 *      - forum
 *    summary: Delete reply from a forum as admin
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_forum:
 *                 type: string
 *                 example: "2334523452345234"
 *               id_comment:
 *                 type: string
 *                 example: "2334523452345234"
 *               id_user:
 *                 type: string
 *                 example: "2334523452345234"
 *    responses:
 *      201:
 *        description: Reply deleted
 *      400:
 *        description: No enough parameters
 *      409:
 *        description: Forum or reply does not exits
 *      500:
 *        description: Error of the server
 */
router.delete(
  "/admin/deletereply",
  isAdmin,
  ForumController.deleteCommentAdmin
);

/**
 * @swagger
 * /forum/deletereply:
 *  delete:
 *    tags:
 *      - forum
 *    summary: Delete reply from a forum as regular user (only can be deleted replies that the user owns)
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_forum:
 *                 type: string
 *                 example: "2334523452345234"
 *               id_comment:
 *                 type: string
 *                 example: "2334523452345234"
 *    responses:
 *      201:
 *        description: Reply deleted
 *      400:
 *        description: No enough parameters
 *      409:
 *        description: Forum or reply does not exits
 *      500:
 *        description: Error of the server
 */
router.delete("/deletereply", ForumController.deleteComment);

/**
 * @swagger
 * /forum/admin/numberofreplies:
 *  get:
 *    tags:
 *      - forum
 *    summary: Gets the number of replies
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    responses:
 *      201:
 *        description: Returns the number of active replies
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                - data: 4
 */
router.get("/admin/numberofreplies", isAdmin, ForumController.numberOfReplies);

/**
 * @swagger
 * /forum/admin/bestcategory:
 *  get:
 *    tags:
 *      - forum
 *    summary: Gets the best category
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    responses:
 *      201:
 *        description: Don't have description
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                - data: gato
 */
router.get("/admin/bestcategory", isAdmin, ForumController.bestCategory);

module.exports = router;
