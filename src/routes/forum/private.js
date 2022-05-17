const Router = require("express");

const ForumController = require("../../controllers/forum.controller");
const { isAdmin } = require("../../middlewares/auth.middleware");

const router = Router();

/* Update user */
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
 *            user_explanation:
 *              type: string
 *          example:
 *            title: "title1"
 *            user_explanation: "explanation1"
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

router.post("/reply", ForumController.addComment);

router.delete("/admin/delete", isAdmin, ForumController.deleteSubForumAdmin);

router.delete("/delete", ForumController.deleteSubForum);

router.delete("/admin/deletereply", isAdmin, ForumController.deleteCommentAdmin);

router.delete("/deletereply", ForumController.deleteComment);

module.exports = router;
