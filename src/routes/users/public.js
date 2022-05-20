const Router = require("express");

const UserController = require("../../controllers/users.controller");

const router = Router();

/* Create user */
/**
 * @swagger
 * /users:
 *  post:
 *    tags:
 *      - users
 *    summary: Create user (Register)
 *    description:
 *    consumes:
 *      - "application/json"
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
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
 *      - in: body
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

module.exports = router;
