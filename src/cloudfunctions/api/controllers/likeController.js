const likesModel = require('../models/likesModel');
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();

const likeController = {
    /* option
    ** @key blogId {string} 微博id
    */
    like: async function(auth, option) {
        const { OPENID } = auth;
        const { blogId } = option;
        const createTime = db.serverDate();

        let ret = await likesModel.create({ OPENID, blogId, createTime});
        return ret;
    },
    /* option
    ** @key blogId {string} 微博id
    */
    unLike: async function(auth, option) {
        const { OPENID } = auth;
        const { blogId } = option;

        const likesArr = await likesModel.show(OPENID, blogId);
        const likeId = (likesArr[0] || {})._id;

        if (!likeId) return false;

        await likesModel.delete(likeId);
        return true;
    },
    likeCount: async function(auth) {
        const { OPENID } = auth;

        const count = await likesModel.LikeCount({ OPENID });
        return count;
    }
};

module.exports = likeController;
