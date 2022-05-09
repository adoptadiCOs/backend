const { model, Schema } = require("mongoose");

const ForumSchema = new Schema(
  {
    // User that owns the sub-forum
    user: {
      type: String,
      required: true,
    },
    // Category of the sub-forum
    category:  {
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

    // Replies of the sub-forum
    replies: [{
      user:  {
        type: String,
        required: true,
      },
      reply:  {
        type: String,
        required: true,
      },
    }],

  },
);

module.exports = model("Forum", ForumSchema);
