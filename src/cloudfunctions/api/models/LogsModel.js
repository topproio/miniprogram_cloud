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
    create: function(data) {
        return db.collection(collection).add({ data });
    },
    delete: function(id) {
        return db.collection(collection).doc(id).remove();
    }
};

module.exports = LogsModel;
