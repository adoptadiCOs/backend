const forumHelper = require("../helpers/forum.helper");

const newForum = async (req, res) => {
    
    const {user, category, title, user_explanation} = req.body;

    if (!user || !title || !user_explanation ){
        return res.status(400).json({ error: "Unspecified some parameters"});
    }

    try {
        if (category === undefined){
            await forumHelper.createSubForumWithoutCat(user, title, user_explanation);
        }
        else{
            await forumHelper.createSubForum(user, category, title, user_explanation);
        }
        return res.status(201).json({message: "Forum created"});
    }
    catch (error) {
        return res.status(409).send({error: "This forum was previously created by the same user"});
    }

}

const addComment = async (req, res) => {
    const {owner, title, user, comment} = req.body;

    if (!owner || !title || !user || !comment){
        return res.status(400).json({ error: "Unspecified some parameters"});
    }

    try{
        await forumHelper.addReply(owner, title, user, comment);
        return res.status(201).json({message: "Comment Added"});
    }catch (error) {
        return res.status(409).send({error: "Error trying to add the reply"});
    }
}

const deleteSubForum = async (req, res) => {

    const {owner, title} = req.body;

    if (!owner || !title){
        return res.status(400).json({ error: "Unspecified some parameters"});
    }

    try{
        await forumHelper.deleteSubForum(owner, title);
        return res.status(201).json({message: "Sub Forum Added"});
    }catch (error) {
        return res.status(409).send({error: "Error trying to delete the subforum"});
    }

}

const deleteComment = async (req, res) => {

    const {owner, title, user, comment} = req.body;

    if (!owner || !title || !user || !comment){
        return res.status(400).json({ error: "Unspecified some parameters"});
    }

    try{
        await deleteReply.deleteReply(owner, title, user, comment);
        return res.status(201).json({message: "Comment deleted"});
    }catch (error) {
        return res.status(409).send({error: "Error trying to add the reply"});
    }

}

const listSubForum = async (req, res) => {

    try{
        var data = await deleteReply.getAllSubForum();
        return res.status(201).json({data});
    }catch (error) {
        return res.status(409).send({error: "Error trying to add the reply"});
    }

}

const listSubForumByCategory = async (req, res) => {

    const {category} = req.body;

    if (!category){
        return res.status(400).json({ error: "Unspecified some parameters"});
    }

    try{
        var data = await deleteReply.category();
        return res.status(201).json({data});
    }catch (error) {
        return res.status(409).send({error: "Error trying to add the reply"});
    }

}

const getSubForum = async (req, res) => {

    const {owner, title} = req.body;

    if (!owner || !title){
        return res.status(400).json({ error: "Unspecified some parameters"});
    }

    try{
        var data = await forumHelper.getSubForum(owner, title);
        return res.status(201).json({data});
    }catch (error) {
        return res.status(409).send({error: "Error trying to delete the subforum"});
    }

}

module.exports = {
    newForum,
    addComment,
    deleteSubForum,
    deleteComment,
    listSubForum,
    listSubForumByCategory,
    getSubForum,
};
  