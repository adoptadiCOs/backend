const Router = require("express");
const passport = require("passport");

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
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "test_1_user_1"
 *               email:
 *                 type: string
 *                 example: "test_1_user_1@gmail.com"
 *               password:
 *                 type: string
 *                 example: "12345"
 *               repeatedPassword:
 *                 type: string
 *                 example: "12345"
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
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test_1_user_1@gmail.com"
 *               password:
 *                 type: string
 *                 example: "12345"
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

/* Logs user into the system with google*/
/**
 * @swagger
 * /users/google:
 *  get:
 *    tags:
 *      - users
 *    summary: Access to the system with Google credentials.
 *    description: Si el usuario no tiene una cuenta la crea
 *    parameters:
 *    responses:
 *     :
 *      description: Redirect to the application with the accessToken as query parameter
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
  UserController.auth_social
);

/* Logs user into the system with github*/
/**
 * @swagger
 * /users/github:
 *  get:
 *    tags:
 *      - users
 *    summary: Access to the system with Github credentials.
 *    description: Si el usuario no tiene una cuenta la crea
 *    parameters:
 *    responses:
 *     :
 *      description: Redirect to the application with the accessToken as query parameter
 */
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  UserController.auth_social
);

/* Get avatar image */
/**
 * @swagger
 * /users/avatar/{id}:
 *  get:
 *    tags:
 *      - users
 *    summary: Get user avatar
 *    consumes:
 *      - "application/json"
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: id
 *        description: Id del avatar del usuario
 *        required: true
 *    responses:
 *      200:
 *        description: Imagen de avatar
 *      404:
 *        description: Avatar no encontrado
 */
router.get("/avatar/:id", UserController.getAvatar);

/* Get user info */
/**
 * @swagger
 * /users/{id}:
 *  get:
 *    tags:
 *      - users
 *    summary: Get user info
 *    description:
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Identificador del usuario a consultar
 *        required: true
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
 *                role:
 *                  type: string
 *                  enum: [user, admin]
 *                bio:
 *                  type: string
 *                avatar:
 *                  type: string
 *                createdAt:
 *                  type: string
 *      404:
 *        description: Usuario no encontrado
 *      500:
 *        description: Error en la petición
 */
router.get("/:id", UserController.getUserInfo);

module.exports = router;
