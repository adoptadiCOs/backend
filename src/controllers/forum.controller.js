const forumHelper = require("../helpers/forum.helper");

const userHelper = require("../helpers/users.helpers");

const newForum = async (req, res) => {
  const { username, category, title, user_explanation } = req.body;

  if (!username || !title || !user_explanation) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  const user = await userHelper.findUserByName(username);

  var prev = await forumHelper.getSubForum(user, title);
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
    return res.status(201).json({ message: "Forum created" });
  } catch (error) {
    console.log(error);
    return res
      .status(409)
      .send({ error: "This forum was previously created by the same user" });
  }
};

const addComment = async (req, res) => {
  const { owner, title, username, comment } = req.body;

  if (!owner || !title || !username || !comment) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  const user_owner = await userHelper.findUserByName(owner);

  const user = await userHelper.findUserByName(username);

  try {
    var aux = await forumHelper.addReply(user_owner, title, user, comment);
    if (!aux) {
      return res.status(409).send({ error: "Error trying to add the reply" });
    }
    return res.status(201).json({ message: "Comment Added" });
  } catch (error) {
    return res.status(409).send({ error: "Error trying to add the reply" });
  }
};

const deleteSubForum = async (req, res) => {
  const { username, title } = req.body;

  if (!username || !title) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  const user = await userHelper.findUserByName(username);

  try {
    var aux = await forumHelper.deleteSubForum(user, title);
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
  const { name, title } = req.body;

  if (!name || !title) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  const user = await userHelper.findUserByName(name);

  try {
    var aux = await forumHelper.deleteSubForum(user, title);
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
  const { owner, title, username, comment } = req.body;

  if (!owner || !title || !username || !comment) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  const user_owner = await userHelper.findUserByName(owner);

  const user = await userHelper.findUserByName(username);

  try {
    var aux = await forumHelper.deleteReply(user_owner, title, user, comment);
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
  const { owner, title, name, comment } = req.body;

  if (!owner || !title || !name || !comment) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  const user_owner = await userHelper.findUserByName(owner);

  const user = await userHelper.findUserByName(name);

  try {
    var aux = await forumHelper.deleteReply(user_owner, title, user, comment);
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
  try {
    var data_aux = await forumHelper.getAllSubForum();

    var data = await Promise.all(
      data_aux.map(async(message) => { 
        var user_aux = await userHelper.findUserById(message.user);
        return {"user": user_aux.username, "title": message.title, "user_explanation": message.user_explanation}
    }));

    return res.status(201).json({ data });
  } catch (error) {
    return res.status(500).send({ error: "Error trying to list forums" });
  }
};

const listSubForumByCategory = async (req, res) => {
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  try {
    var data_aux = await forumHelper.getByCategory(category);

    var data = await Promise.all(
      data_aux.map(async(message) => { 
        var user_aux = await userHelper.findUserById(message.user);
        return {"user": user_aux.username, "title": message.title, "user_explanation": message.user_explanation, "category": message.category}
    }));

    return res.status(201).json({ data });
  } catch (error) {
    return res
      .status(409)
      .send({ error: "Error trying to list forums of that category" });
  }
};

const getSubForum = async (req, res) => {
  const { owner, title } = req.body;

  if (!owner || !title) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  const user_owner = await userHelper.findUserByName(owner);

  try {
    var data = await forumHelper.getSubForum(user_owner, title);
    data[0].replies = data[0].replies.filter(function (a) {
      return a.reply_enabled !== false;
    });
    return res.status(201).json({ data });
  } catch (error) {
    return res.status(404).send({ error: "Error trying to get the subforum" });
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
};
