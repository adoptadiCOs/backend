const Router = require("express");

const UserController = require("../../controllers/users.controller");
const { isAdmin } = require("../../middlewares/auth.middleware");

const upload = require("../../middlewares/upload.middleware");

const router = Router();

/* Update biography */
/**
 * @swagger
 * /users/bio:
 *  put:
 *    tags:
 *      - users
 *    summary: Update user biography
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
 *               bio:
 *                 type: string
 *                 example: "bio1"
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
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "12345"
 *               newPassword:
 *                 type: string
 *                 example: "12345"
 *               repeatedNewPassword:
 *                 type: string
 *                 example: "12345"
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
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newUsername:
 *                 type: string
 *                 example: "usernuevo_test_1"
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

/* Update avatar */
/**
 * @swagger
 * /users/avatar:
 *  put:
 *    tags:
 *      - users
 *    summary: Update user avatar
 *    description:
 *    consumes:
 *      - multipart/form-data
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: formData
 *        name: avatar
 *        description: Imagen de avatar (png, jpg)
 *        required: true
 *        type: file
 *    responses:
 *      200:
 *        description: Operación realizada correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                avatar:
 *                  type: string
 *      404:
 *        description: Usuario no encontrado
 *      500:
 *        description: Error en la petición
 */
router.put("/avatar", upload.single("avatar"), UserController.updateAvatar);

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
 *      200:
 *        description: Operación realizada correctamente
 *      400:
 *        description: Descripción del error en la respuesta
 *      500:
 *        description: Error en la petición
 */
router.delete("/", UserController.deleteUser);

/* Ban user */
/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    tags:
 *      - users
 *    summary: Ban user
 *    description: Solo disponible para administradores
 *    consumes:
 *      - "application/json"
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Id del usuario a eliminar
 *        required: true
 *    responses:
 *      200:
 *        description: Operación realizada correctamente
 *      400:
 *        description: Descripción del error en la respuesta
 *      403:
 *        description: No se esta autorizado para realizar la tarea
 *      404:
 *        description: Usuario no encontrado
 *      500:
 *        description: Error en la petición
 */
router.delete("/:id", isAdmin, UserController.banUser);

/* Get all users */
/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *      - users
 *    summary: Get all users
 *    description: Solo disponible para administradores
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

/* Gets its own info */
/**
 * @swagger
 * /users/info/me:
 *  get:
 *    tags:
 *      - users
 *    summary: Gets its own info
 *    description:
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
router.get("/info/me", UserController.getOwnInfo);

module.exports = router;
