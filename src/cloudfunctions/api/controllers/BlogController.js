const LogsModel = require('../models/LogsModel');
const { getTempFileURLById } = require('../utils/file');

const BlogController = {
    fetchList: async function(auth, option) {
        const { OPENID } = auth;

        let { data } = await LogsModel.List(option);
        let blogArr = [];

        // 修改时间格式和是否创建者字段
        blogArr = data.map(blog => {
            blog.createTime = new Date(blog.createTime).toLocaleTimeString();
            blog.isCreator = blog._openid === OPENID;
            return blog;
        });

        // 使用图片id获取图片地址
        const PromiseAllForPhoto = blogArr.map(blog => {
            return getTempFileURLById(blog.photoIds).then(photoUrlArr => {
                blog.photoUrlArr = photoUrlArr;
                return blog;
            });
        });
        blogArr = await Promise.all(PromiseAllForPhoto);

        return blogArr;
    }
};

module.exports = BlogController;
