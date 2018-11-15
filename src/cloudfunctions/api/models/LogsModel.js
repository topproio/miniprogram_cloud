const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();

const collection = 'logs';
const likeCollection = 'likes';
const LogsModel = {
    List: function({page = 1, paginate = 20} = {}, where) {
        let res = db.collection(collection).orderBy('createTime', 'desc');

        if (where) { // 如果有查询条件
            res = res.where(where);
        }

        const skip = (page - 1) * paginate;
        if (skip) { // 如果不是第一页指定序列
            res = res.skip(skip);
        }

        res = res.limit(paginate).get();

        return res;
    },
    BlogIdByUser: function(OPENID) {
        return db.collection(collection)
            .where({OPENID})
            .field({ _id: true })
            .get()
            .then(res => res.data.map(item => item._id));
    },
    create: function(data) {
        return db.collection(collection).add({ data });
    },
    delete: function(id) {
        return db.collection(collection).doc(id).remove();
    },
    isExist: function(_id) {
        return db.collection(collection).where({ _id }).get().then(res => !!res.data.length);
    }
};

module.exports = LogsModel;
