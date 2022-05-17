const Router = require("express");

const UserController = require("../../controllers/users.controller");
const { isAdmin } = require("../../middlewares/auth.middleware");

const router = Router();

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
 *    responses:
 *      204:
 *        description: Operación realizada correctamente
 *      400:
 *        description: Descripción del error en la respuesta
 *      500:
 *        description: Error en la petición
 */
router.get("/logout", UserController.logout);

/* Update biography */
/**
 * @swagger
 * /users/biography:
 *  put:
 *    tags:
 *      - users
 *    summary: Update user biography
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    parameters:
 *      - in: body
 *        description: New user biography
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            bio:
 *              type: string
 *    responses:
 *      200:
 *        description: Operación realizada correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                bio:
 *                  type: string
 *      404:
 *        description: Usuario no encontrado
 *      500:
 *        description: Error en la petición
 */
router.put("/bio", UserController.updateBio);

/**
 * @swagger
 * /users/password:
 *  put:
 *    tags:
 *      - users
 *    summary: Update user password
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    parameters:
 *      - in: body
 *        description: New user password
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            password:
 *              type: string
 *            newPassword:
 *              type: string
 *            repeatedNewPassword:
 *              type: string
 *    responses:
 *      200:
 *        description: Operación realizada correctamente
 *      400:
 *        description: Descripción del error en la respuesta
 *      404:
 *        description: Usuario no encontrado
 *      500:
 *        description: Error en la petición
 */
router.put("/password", UserController.updatePassword);

/**
 * @swagger
 * /users/username:
 *  put:
 *    tags:
 *      - users
 *    summary: Update username
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *    - application/json
 *    parameters:
 *      - in: body
 *        description: New username
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            newUsername:
 *              type: string
 *    responses:
 *      200:
 *        description: Operación realizada correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *              accessToken:
 *                  type: string
 *      400:
 *        description: Descripción del error en la respuesta
 *      409:
 *        description: Usuario ya en uso
 *      500:
 *        description: Error en la petición
 */
router.put("/username", UserController.updateUsername);

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
 *      - application/json
 *    parameters:
 *    responses:
 *      204:
 *        description: Operación realizada correctamente
 *      400:
 *        description: Descripción del error en la respuesta
 *      500:
 *        description: Error en la petición
 */
router.delete("/", UserController.deleteUser);

/* Get all users */
/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *      - users
 *    summary: Get all users
 *    description: Solo disponible para administradores
 *    consumes:
 *      - "application/json"
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      200:
 *        description: Operación realizada correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                username:
 *                  type: string
 *                  enum: [user, admin]
 *                role:
 *                  type: string
 *                avatar:
 *                  type: string
 *      500:
 *        description: Error en la petición
 */
router.get("/", isAdmin, UserController.getUsers);

module.exports = router;
