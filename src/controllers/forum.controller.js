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

module.exports = {
    newForum,
};
  