const Forum = require("../models/forum");

const createSubForum = async (
  user_f,
  category_f,
  title_f,
  user_explanation_f
) => {
  const date_f = new Date().getTime();

  const forum = new Forum({
    user: user_f,
    category: category_f,
    title: title_f,
    user_explanation: user_explanation_f,
    date: date_f,
    enabled: true,
  });

  return await forum.save();
};

const createSubForumWithoutCat = async (
  user_f,
  title_f,
  user_explanation_f
) => {
  const date_f = new Date().getTime();

  const forum = new Forum({
    user: user_f,
    title: title_f,
    user_explanation: user_explanation_f,
    date: date_f,
    enabled: true,
  });

  return await forum.save();
};

const addReply = async (id_forum, user_reply, text_reply) => {
  const date = new Date().getTime();

  return await Forum.findOneAndUpdate(
    { _id: id_forum },
    {
      $push: {
        replies: {
          user: user_reply,
          reply: text_reply,
          reply_date: date,
          reply_enabled: true,
        },
      },
    }
  );
};

const deleteSubForum = async (id_forum) => {
  return await Forum.findOneAndUpdate(
    { _id: id_forum, enabled: true },
    { enabled: false }
  );
};

const deleteReply = async (forum_id, user_id, reply_id) => {
  const query = {
    _id: forum_id,
    "replies.reply_enabled": true,
    "replies._id": reply_id,
    "replies.user": user_id,
  };

  const updateDocument = {
    $set: { "replies.$[item].reply_enabled": false },
  };

  const options = {
    arrayFilters: [
      {
        "item._id": reply_id,
        "item.user": user_id,
        "item.reply_enabled": true,
      },
    ],
  };

  return await Forum.findOneAndUpdate(query, updateDocument, options);
};

const checkCommentOwner = async (forum_id, user_id, reply_id) => {
  return await Forum.find({
    "replies.reply_enabled": true,
    "replies._id": reply_id,
    "replies.user": user_id,
    _id: forum_id,
  });
};

const getAllSubForum = async () => {
  return await Forum.find({ enabled: true });
};

const getAllSubForumPaged = async (starts, rows) => {
  return await Forum.find({ enabled: true }, {}, { skip: starts, limit: rows });
};

const getByCategoryPaged = async (category_f, starts, rows) => {
  return await Forum.find(
    { category: category_f, enabled: true },
    {},
    { skip: starts, limit: rows }
  );
};

const getBestCategory = async () => {
  return await Forum.aggregate([
    { $match: { enabled: true } },
    { $sortByCount: "$category" },
  ]);
};

const getSubForum = async (id_forum) => {
  return await Forum.find({ _id: id_forum, enabled: true });
};

module.exports = {
  createSubForum,
  createSubForumWithoutCat,
  addReply,
  deleteSubForum,
  deleteReply,
  checkCommentOwner,
  getAllSubForum,
  getAllSubForumPaged,
  getByCategoryPaged,
  getBestCategory,
  getSubForum,
};
