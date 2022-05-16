const Forum = require("../models/forum");

const createSubForum = async (user_f, category_f, title_f, user_explanation_f) => {

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

const createSubForumWithoutCat = async (user_f, title_f, user_explanation_f) => {

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

const addReply = async (forum_owner, title_f, user_reply, text_reply) => {

    const date = new Date().getTime();

    return await Forum.findOneAndUpdate(
        {user: forum_owner, title: title_f},
        { $push: {
            replies: {
                user: user_reply,
                reply: text_reply,
                reply_date: date,
                reply_enabled: true
            }
        } });

}

const deleteSubForum = async (forum_owner, title_f) => {

    return await Forum.findOneAndUpdate(
        {user: forum_owner, title: title_f},
        {enabled: false},
    );

} 

const deleteReply = async (forum_owner, title_f, user_reply, text_reply) => {

    const query = { user: forum_owner, title: title_f };
    
    const updateDocument = {
      $set: { "replies.$[item].reply_enabled": false }
    };

    const options = {
      arrayFilters: [{
        "item.user": user_reply,
        "item.reply": text_reply,
      }]
    };

    return await Forum.updateOne(query, updateDocument, options)
/*
    return await Forum.findOneAndUpdate(
        {user: forum_owner, title: title_f, replies: {user: user_reply, reply: text_reply}},
        { $set: {"replies.$.reply_enabled": false}},
    );
*/
}

const getAllSubForum = async () => {
    return await Forum.find({enabled: true}, { user: 1, title: 1, user_explanation: 1 });
}

const getByCategory = async (category_f) => {
    return await Forum.find({category: category_f, enabled: true}, { user: 1, title: 1, user_explanation: 1, category: 1});
}

const getSubForum = async (forum_owner, title_f) => {
    return await Forum.find({user: forum_owner, title: title_f, enabled: true});
}

module.exports = {
    createSubForum,
    createSubForumWithoutCat,
    addReply,
    deleteSubForum,
    deleteReply,
    getAllSubForum,
    getByCategory,
    getSubForum,
};