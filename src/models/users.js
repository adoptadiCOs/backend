const { model, Schema } = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - password
 *         - role
 *       properties:
 *         email:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [User, Admin]
 *         bio:
 *           type: string
 *         avatar:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 */
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      inmutable: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
      required: true,
    },
    bio: {
      type: String,
      maxLength: 160,
    },
    avatar: {
      type: String, // TODO: Investigar como guardar fotos
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt properties
);

module.exports = model("User", UserSchema);
