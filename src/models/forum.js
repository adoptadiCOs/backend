const { model, Schema } = require("mongoose");

const ForumSchema = new Schema(
  {
    // User that owns the sub-forum
    user: {
      type: String,
      required: true,
    },
    // Category of the sub-forum
    category: {
      type: String,
    },
    // Title and explanation of the sub-forum
    title: {
      type: String,
      required: true,
    },
    user_explanation: {
      type: String,
      required: true,
    },
    // Date of the creation of the sub-forum
    date: {
      type: Date,
      required: true,
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },

    // Replies of the sub-forum
    replies: [
      {
        user: {
          type: String,
          required: true,
        },
        reply: {
          type: String,
          required: true,
        },
        // Date of the creation of reply
        reply_date: {
          type: Date,
          required: true,
        },
        reply_enabled: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt properties
);

module.exports = model("Forum", ForumSchema);
