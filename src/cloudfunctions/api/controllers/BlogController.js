const LogsModel = require('../models/LogsModel');
const likesModel = require('../models/likesModel');
const { getTempFileURLById } = require('../utils/file');
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();

const BlogController = {
    /* option
    ** @key page {number} 请求页数
    ** @key paginate {number} 分页数量
    */
    fetchList: async function(auth, option) {
        const { OPENID } = auth;

        let { data } = await LogsModel.List(option);
        let blogArr = [];

        // 修改时间格式和是否创建者字段
        blogArr = data.map(blog => {
            blog.createTime = new Date(blog.createTime).toLocaleTimeString();
            blog.isCreator = blog.OPENID === OPENID;
            return blog;
        });

        // 使用图片id获取图片地址
        const PromiseAllForPhoto = blogArr.map(blog => {
            return getTempFileURLById(blog.photoIds).then(photoUrlArr => {
                blog.photoUrlArr = photoUrlArr;
            });
        });

        // 获取日志是否被点赞
        const PromiseAllForHasLike = blogArr.map(blog => {
            return likesModel.hasLike(blog._id, OPENID).then(hasLike => {
                blog.hasLike = hasLike;
            });
        });

        // 获取日志被点赞数
        const PromiseAllForLikeCount = blogArr.map(blog => {
            return likesModel.LikeCount(blog._id).then(likeCount => {
                blog.likeCount = likeCount;
            });
        });

        await Promise.all(PromiseAllForPhoto.concat(PromiseAllForHasLike, PromiseAllForLikeCount));

        return blogArr;
    },
    /* option
    ** @key logContent {spring} 日志内容
    ** @key photoIds {array} 图片id的数组
    ** @key userInfo {Object} 用户信息
    */
    create: async function(auth, option) {
        const { logContent, photoIds, userInfo } = option;
        const { OPENID } = auth;
        const createTime = db.serverDate();

        const res = await LogsModel.create({ logContent, photoIds, userInfo, OPENID, createTime});
        return res;
    },
    /* option
    ** @key id {spring} 日志id
    ** @key photoIds {array} 图片id的数组
    */
    delete: async function(auth, option) {
        const { id, photoids } = option;

        cloud.deleteFile({ fileList: photoids });
        return LogsModel.delete(id);
    }
};

module.exports = BlogController;
