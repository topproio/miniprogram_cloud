const likesModel = require('../models/likesModel');
const LogsModel = require('../models/LogsModel');
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();
const _ = db.command;

const likeController = {
    /* option
    ** @key blogId {string} 微博id
    */
    like: async function(auth, option) {
        const { OPENID } = auth;
        const { blogId } = option;
        const createTime = db.serverDate();

        const hasBlog = await LogsModel.isExist(blogId);
        if (!hasBlog) return false;

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

        const blogIdArr = await LogsModel.BlogIdByUser(OPENID);
        const count = await likesModel.LikeCount({ blogId: _.in(blogIdArr) });
        console.log(blogIdArr);
        return count;
    }
};

module.exports = likeController;
