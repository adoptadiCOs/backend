const forumHelper = require("../helpers/forum.helper");

const newForum = async (req, res) => {
  const { username, category, title, user_explanation } = req.body;

  if (!username || !title || !user_explanation) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  var prev = await forumHelper.getSubForum(username, title);
  var len = prev.length; 

  if (len !== 0){
    return res
      .status(409)
      .send({ error: "This forum was previously created by the same user"});
  }

  try {
    if (category === undefined) {
      await forumHelper.createSubForumWithoutCat(username, title, user_explanation);
    } else {
      await forumHelper.createSubForum(username, category, title, user_explanation);
    }
    return res.status(201).json({ message: "Forum created" });
  } catch (error) {
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

  try {
    var aux = await forumHelper.addReply(owner, title, username, comment);
    if (!aux){
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

  try {
    var aux = await forumHelper.deleteSubForum(username, title);
    if (!aux){
      return res.status(409).send({ error: "Error trying to delete the subforum" });
    }
    return res.status(201).json({ message: "Sub Forum Deleted" });
  } catch (error) {
    return res
      .status(409)
      .send({ error: "Error trying to delete the subforum" });
  }
};

const deleteComment = async (req, res) => {
  const { owner, title, user, comment } = req.body;

  if (!owner || !title || !user || !comment) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  try {
    await forumHelper.deleteReply(owner, title, user, comment);
    return res.status(201).json({ message: "Comment deleted" });
  } catch (error) {
    return res.status(409).send({ error: "Error trying to delete the reply" });
  }
};

const listSubForum = async (req, res) => {
  try {
    var data = await forumHelper.getAllSubForum();
    return res.status(201).json({ data });
  } catch (error) {
    return res.status(409).send({ error: "Error trying to list forums" });
  }
};

const listSubForumByCategory = async (req, res) => {
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ error: "Unspecified some parameters" });
  }

  try {
    var data = await forumHelper.getByCategory(category);
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

  try {
    var data = await forumHelper.getSubForum(owner, title);
    return res.status(201).json({ data });
  } catch (error) {
    return res.status(409).send({ error: "Error trying to get the subforum" });
  }
};

module.exports = {
  newForum,
  addComment,
  deleteSubForum,
  deleteComment,
  listSubForum,
  listSubForumByCategory,
  getSubForum,
};
