const LogsModel = require('../models/LogsModel');
const likesModel = require('../models/LikesModel');
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();
const _ = db.command;

const BlogController = {
    /* option
    ** @key page {number} 请求页数
    ** @key paginate {number} 分页数量
    */
    fetchList: async function(auth, option) {
        const { OPENID } = auth;

        let { data } = await LogsModel.List(option);

        const blogArr = await this._transformBlog(data, OPENID);

        return blogArr;
    },
    /* option
    ** @key page {number} 请求页数
    ** @key paginate {number} 分页数量
    */
    fetchListWithLike: async function(auth, option) {
        const { OPENID } = auth;

        // 获取当前用户所有点赞微博
        const blogIdArr = await likesModel.listWithUser(OPENID);
        const { data } = await LogsModel.List(option, { _id: _.in(blogIdArr) });

        const blogArr = await this._transformBlog(data, OPENID);

        return blogArr;
    },
    /* option
    ** @key logContent {spring} 微博内容
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
    ** @key id {spring} 微博id
    ** @key photoIds {array} 图片id的数组
    */
    delete: async function(auth, option) {
        const { id, photoids } = option;

        // 删除微博有关的赞
        const likeIdArr = await likesModel.fethcLikeIdByBlogId(id);
        const PromiseForDeleteLike = likesModel.deleteByWhere({_id: _.in(likeIdArr)});

        // 删除微博
        const PromiseForDeleteBlog = LogsModel.delete(id);
        cloud.deleteFile({ fileList: photoids });
        return Promise.all([PromiseForDeleteLike, PromiseForDeleteBlog]);
    },
    // 处理微博格式
    _transformBlog: function(data, OPENID) {
        let blogArr = [];

        // 修改时间格式和是否创建者字段
        blogArr = data.map(blog => {
            blog.isCreator = blog.OPENID === OPENID;
            return blog;
        });

        // 获取微博是否被点赞
        const PromiseAllForHasLike = blogArr.map(blog => {
            return likesModel.hasLike(blog._id, OPENID).then(hasLike => {
                blog.hasLike = hasLike;
            });
        });

        // 获取微博被点赞数
        const PromiseAllForLikeCount = blogArr.map(blog => {
            return likesModel.LikeCount({ blogId: blog._id }).then(likeCount => {
                blog.likeCount = likeCount;
            });
        });

        return Promise.all(PromiseAllForHasLike.concat(PromiseAllForLikeCount)).then(() => blogArr);
    }
};

module.exports = BlogController;
