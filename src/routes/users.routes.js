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
 *      201:
 *        description: Operación realizada correctamente
 *      400:
 *        description: Descripción del error en la respuesta
 *      409:
 *        description: Usuario/correo ya en uso
 *      500:
 *        description: Error en la petición
 */
router.post("/", UserController.signup);

/* Logs user into the system */
/**
 * @swagger
 * /users/login:
 *  post:
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
 *                email:
 *                  type: string
 *                role:
 *                  type: string
 *                bio:
 *                  type: string
 *                avatar:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                accessToken:
 *                  type: string
 *      400:
 *        description: Descripción del error en la respuesta
 *      404:
 *        description: Usuario no encontrado
 *      500:
 *        description: Error en la petición
 */
router.post("/login", UserController.login);

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
 *      204:
 *        description: Operación realizada correctamente
 *      400:
 *        description: Descripción del error en la respuesta
 *      500:
 *        description: Error en la petición
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
 *            bio:
 *              type: string
 *            avatar:
 *              type: string
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
 *                email:
 *                  type: string
 *                role:
 *                  type: string
 *                bio:
 *                  type: string
 *                avatar:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                accessToken:
 *                  type: string
 *      404:
 *        description: Usuario no encontrado
 *      500:
 *        description: Error en la petición
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
router.delete("/", verifyToken, UserController.deleteUser);

module.exports = router;
