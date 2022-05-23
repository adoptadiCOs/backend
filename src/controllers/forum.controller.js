const forumHelper = require("../helpers/forum.helper");

const userHelper = require("../helpers/users.helpers");

const newForum = async (req, res) => {
  const { username, category, title, user_explanation } = req.body;

  if (!username || !title || !user_explanation) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  const user = await userHelper.findUserByName(username);

  var prev = await forumHelper.getSubForumUserName(user, title);
  var len = prev.length;

  if (len !== 0) {
    return res
      .status(409)
      .send({ error: "This forum was previously created by the same user" });
  }

  try {
    if (category === undefined) {
      await forumHelper.createSubForumWithoutCat(user, title, user_explanation);
    } else {
      await forumHelper.createSubForum(user, category, title, user_explanation);
    }

    var data_aux = await forumHelper.getSubForumUserName(user, title);

    var data_arr = await Promise.all(
      data_aux.map(async (message) => {
        var user_aux = await userHelper.findUserById(message.user);

        return {
          user: user_aux.username,
          id: message._id,
          title: message.title,
          user_explanation: message.user_explanation,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        };
      })
    );

    var data = data_arr[0];

    return res.status(201).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: "Error creating the new forum" });
  }
};

const addComment = async (req, res) => {
  const { id_forum, username, comment } = req.body;

  if (!id_forum || !username || !comment) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  const user = await userHelper.findUserByName(username);

  try {
    var aux = await forumHelper.addReply(id_forum, user, comment);
    if (!aux) {
      return res.status(409).send({ error: "Error trying to add the reply" });
    }

    var data_aux = await forumHelper.getSubForum(id_forum);

    var data_arr = await Promise.all(
      data_aux.map(async (message) => {
        var resplies_aux = message.replies.filter(function (a) {
          return a.reply_enabled !== false;
        });

        var resplies_final = await Promise.all(
          resplies_aux.map(async (reply_i) => {
            var user_aux = await userHelper.findUserById(reply_i.user);
            return {
              user_id: user_aux._id,
              reply: reply_i.reply,
              id: reply_i._id,
              reply_date: reply_i.reply_date,
            };
          })
        );

        return {
          user_id: message.user,
          id: message._id,
          title: message.title,
          user_explanation: message.user_explanation,
          replies: resplies_final,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        };
      })
    );

    var data = data_arr[0];

    return res.status(201).json({ data });
  } catch (error) {
    return res.status(409).send({ error: "Error trying to add the reply" });
  }
};

const deleteSubForum = async (req, res) => {
  const { id_forum, id } = req.body;

  if (!id_forum || !id) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  try {
    var forum_aux = await forumHelper.getSubForum(id_forum);

    if (forum_aux[0].user != id) {
      return res.status(409).send({
        error: "Error: You don't have permission to delete this forum",
      });
    }

    var aux = await forumHelper.deleteSubForum(id_forum);
    if (!aux) {
      return res
        .status(409)
        .send({ error: "Error trying to delete the subforum" });
    }
    return res.status(201).json({ message: "Sub Forum Deleted" });
  } catch (error) {
    return res
      .status(409)
      .send({ error: "Error trying to delete the subforum" });
  }
};

const deleteSubForumAdmin = async (req, res) => {
  const { id_forum } = req.body;

  if (!id_forum) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  try {
    var aux = await forumHelper.deleteSubForum(id_forum);
    if (!aux) {
      return res
        .status(409)
        .send({ error: "Error trying to delete the subforum" });
    }
    return res.status(201).json({ message: "Sub Forum Deleted" });
  } catch (error) {
    return res
      .status(409)
      .send({ error: "Error trying to delete the subforum" });
  }
};

const deleteComment = async (req, res) => {
  const { id_forum, id_comment, id } = req.body;

  if (!id_forum || !id || !id_comment) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  try {
    var prev = await forumHelper.checkCommentOwner(id_forum, id, id_comment);
    var len = prev.length;

    if (len === 0) {
      return res.status(409).send({
        error: "This reply doesn't exist or you don't have permissions",
      });
    }

    var aux = await forumHelper.deleteReply(id_forum, id, id_comment);

    console.log(aux);

    if (!aux) {
      return res
        .status(409)
        .send({ error: "Error trying to delete the reply" });
    }
    return res.status(201).json({ message: "Comment deleted" });
  } catch (error) {
    return res.status(409).send({ error: "Error trying to delete the reply" });
  }
};

const deleteCommentAdmin = async (req, res) => {
  const { id_forum, id_comment, id_user } = req.body;

  if (!id_forum || !id_user || !id_comment) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  console.log(id_forum);
  console.log(id_comment);
  console.log(id_user);

  try {
    var aux = await forumHelper.deleteReply(id_forum, id_user, id_comment);
    console.log(aux);
    if (!aux) {
      return res
        .status(409)
        .send({ error: "Error trying to delete the reply" });
    }
    return res.status(201).json({ message: "Comment deleted" });
  } catch (error) {
    return res.status(409).send({ error: "Error trying to delete the reply" });
  }
};

const listSubForum = async (req, res) => {
  const starts = parseInt(req.query.starts) || 0;
  const rows =
    req.query.rows < 50 && req.query.rows > 0 ? parseInt(req.query.rows) : 50;

  try {
    var data_aux = await forumHelper.getAllSubForumPaged(starts, rows);

    var data = await Promise.all(
      data_aux.map(async (message) => {
        return {
          user_id: message.user,
          category: message.category,
          title: message.title,
          id: message._id,
          user_explanation: message.user_explanation,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        };
      })
    );

    console.log(data);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).send({ error: "Error trying to list forums" });
  }
};

const listSubForumByCategory = async (req, res) => {
  const category = req.query.category;

  const starts = parseInt(req.query.starts) || 0;
  const rows =
    req.query.rows < 50 && req.query.rows > 0 ? parseInt(req.query.rows) : 50;

  if (!category) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  try {
    var data_aux = await forumHelper.getByCategoryPaged(category, starts, rows);

    var data = await Promise.all(
      data_aux.map(async (message) => {
        return {
          user_id: message.user,
          category: message.category,
          title: message.title,
          id: message._id,
          user_explanation: message.user_explanation,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        };
      })
    );

    return res.status(200).json({ data });
  } catch (error) {
    return res
      .status(409)
      .send({ error: "Error trying to list forums of that category" });
  }
};

const getSubForum = async (req, res) => {
  const id_forum = req.query.id_forum;

  if (!id_forum) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  try {
    var data_aux = await forumHelper.getSubForum(id_forum);

    console.log(data_aux);

    var data_arr = await Promise.all(
      data_aux.map(async (message) => {
        var resplies_aux = message.replies.filter(function (a) {
          return a.reply_enabled !== false;
        });

        var resplies_final = await Promise.all(
          resplies_aux.map(async (reply_i) => {
            var user_aux = await userHelper.findUserById(reply_i.user);
            return {
              user_id: user_aux._id,
              reply: reply_i.reply,
              id: reply_i._id,
              reply_date: reply_i.reply_date,
            };
          })
        );

        return {
          user_id: message.user,
          category: message.category,
          title: message.title,
          id: message._id,
          user_explanation: message.user_explanation,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
          replies: resplies_final,
        };
      })
    );

    var data = data_arr[0];

    return res.status(201).json({ data });
  } catch (error) {
    return res.status(404).send({ error: "Error trying to get the subforum" });
  }
};

const numberOfForums = async (req, res) => {
  var data_aux = await forumHelper.getAllSubForum();

  var data = data_aux.length;

  return res.status(201).json({ data });
};

const numberOfReplies = async (req, res) => {
  var data = 0;

  try {
    var data_aux = await forumHelper.getAllSubForum();

    await Promise.all(
      data_aux.map(async (message) => {
        var resplies_aux = message.replies.filter(function (a) {
          return a.reply_enabled !== false;
        });

        var resplies_final = resplies_aux.map(() => {
          data = data + 1;
        });

        return {
          user_id: message.user,
          category: message.category,
          title: message.title,
          id: message._id,
          user_explanation: message.user_explanation,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
          replies: resplies_final,
        };
      })
    );

    return res.status(201).json({ data });
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Error trying to get the number of replies" });
  }
};

const bestCategory = async (req, res) => {
  try {
    var data_aux = await forumHelper.getBestCategory();

    var best = data_aux[0]._id;

    if (!best) {
      best = data_aux[1]._id;
    }
    return res.status(200).json({ best });
  } catch (error) {
    return res.status(500).send({ error: "Error trying to list forums" });
  }
};

module.exports = {
  newForum,
  addComment,
  deleteSubForum,
  deleteSubForumAdmin,
  deleteComment,
  deleteCommentAdmin,
  listSubForum,
  listSubForumByCategory,
  getSubForum,
  numberOfForums,
  numberOfReplies,
  bestCategory,
};
