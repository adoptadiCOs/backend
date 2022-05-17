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
 *    parameters:
 *      - name: access-token
 *        in: header
 *        required: true
 *      - name: forum
 *        in: body
 *        description: Fields to update
 *        required: false
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            category:
 *              type: string
 *            user_explanation:
 *              type: string
 *          example:
 *            title: "title1"
 *            user_explanation: "explanation1"
 *            category: "cats"
 *    responses:
 *      201:
 *        description: Forum created
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
 *    parameters:
 *      - name: access-token
 *        in: header
 *        required: true
 *      - name: forum
 *        in: body
 *        description: Fields to update
 *        required: false
 *        schema:
 *          type: object
 *          properties:
 *            owner:
 *              type: string
 *            title:
 *              type: string
 *            comment:
 *              type: string
 *          example:
 *            owner: "user1"
 *            title: "title1"
 *            comment: "comment1"
 *    responses:
 *      201:
 *        description: Comment added
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
 *    parameters:
 *      - name: access-token
 *        in: header
 *        required: true
 *      - name: forum
 *        in: body
 *        description: Fields to update
 *        required: false
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            title:
 *              type: string
 *          example:
 *            name: "user1"
 *            title: "title1"
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
 *    parameters:
 *      - name: access-token
 *        in: header
 *        required: true
 *      - name: forum
 *        in: body
 *        description: Fields to update
 *        required: false
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            title:
 *              type: string
 *          example:
 *            name: "user1"
 *            title: "title1"
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
 *    parameters:
 *      - name: access-token
 *        in: header
 *        required: true
 *      - name: forum
 *        in: body
 *        description: Fields to update
 *        required: false
 *        schema:
 *          type: object
 *          properties:
 *            owner:
 *              type: string
 *            title:
 *              type: string
 *            name:
 *              type: string
 *            comment:
 *              type: string
 *          example:
 *            owner: "user1"
 *            title: "title1"
 *            name: "user2"
 *            comment: "comment2"
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
 *    summary: Delete reply from a forum as regular user (only can be deleted forums that the user owns)
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    parameters:
 *      - name: access-token
 *        in: header
 *        required: true
 *      - name: forum
 *        in: body
 *        description: Fields to update
 *        required: false
 *        schema:
 *          type: object
 *          properties:
 *            owner:
 *              type: string
 *            title:
 *              type: string
 *            comment:
 *              type: string
 *          example:
 *            owner: "user1"
 *            title: "title1"
 *            comment: "comment"
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

module.exports = router;
