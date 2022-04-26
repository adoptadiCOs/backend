const { model, Schema } = require("mongoose");

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
      unique: true,
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
