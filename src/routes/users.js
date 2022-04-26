const Router = require("express");

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
 *        description: Suscessful operation
 */
router.post("/", (_, res) => {
  res.send("Create user route");
});

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
 * 
 */
router.get("/login", (_, res) => {
  res.send("Login route");
});

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
 *      200:
 *        description: Suscessful operation
 */
router.get("/logout", (_, res) => {
  res.send("Logout route");
});

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
router.put("/", (_, res) => {
  res.send("Update user route");
});

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
router.get("/", (_, res) => {
  res.send("Delete user route");
});

module.exports = router;
