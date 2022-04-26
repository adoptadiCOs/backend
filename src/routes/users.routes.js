const Router = require("express");

const UserController = require("../controllers/users.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

const router = Router();

/* Create user */
/**
 * @swagger
 * /users:
 *  post:
 *    tags:
 *      - users
 *    summary: Create user
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: user
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            repeatedPassword:
 *              type: string
 *    responses:
 *      200:
 *        description: Suscessful operation
 */
router.post("/", UserController.signup);

/* Logs user into the system */
/**
 * @swagger
 * /users/login:
 *  get:
 *    tags:
 *      - users
 *    summary: Logs user into the system
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    parameters:
 *      - name: user
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      200:
 *        description: Suscessful operation
 *        schema:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            rol:
 *              type: string
 *            createdAt:
 *              type: date
 *            accessToken:
 *              type: string
 *
 */
router.get("/login", UserController.login);

/* Logs out the current user  */
/**
 * @swagger
 * /users/logout:
 *  get:
 *    tags:
 *      - users
 *    summary: Logs out the current user
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    parameters:
 *      - name: access-token
 *        in: header
 *        required: true
 *    responses:
 *      200:
 *        description: Suscessful operation
 */
router.get("/logout", verifyToken, UserController.logout);

/* Update user */
/**
 * @swagger
 * /users:
 *  put:
 *    tags:
 *      - users
 *    summary: Update user
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    parameters:
 *      - name: user
 *        in: body
 *        description: Fields to update
 *        required: false
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            bio:
 *              type: string
 *            avatar:
 *              type: string
 *    responses:
 *      200:
 *        description: Suscessful operation
 */
router.put("/", verifyToken, UserController.updateUser);

/* Delete user */
/**
 * @swagger
 * /users:
 *  delete:
 *    tags:
 *      - users
 *    summary: Delete user
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    parameters:
 *    responses:
 *      200:
 *        description: Suscessful operation
 */
router.delete("/", verifyToken, UserController.deleteUser);

module.exports = router;
