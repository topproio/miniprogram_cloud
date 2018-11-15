const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();

const collection = 'likes';
const likesModel = {
    create: function(data) {
        return db.collection(collection).add({ data });
    },
    delete: function(likeId) {
        return db.collection(collection).doc(likeId).remove();
    },
    deleteByWhere: function(where) {
        return db.collection(collection).where(where).remove();
    },
    show: function(OPENID, blogId) {
        return db.collection(collection)
            .where({ OPENID, blogId })
            .field({ _id: true })
            .get()
            .then(res => res.data);
    },
    listWithUser: function(OPENID) {
        return db.collection(collection)
        .where({ OPENID })
        .field({ blogId: true })
        .get()
        .then(res => {
            return res.data.map(item => item.blogId);
        });
    },
    fethcLikeIdByBlogId: function(blogId) {
        return db.collection(collection)
        .where({ blogId })
        .field({ _id: true })
        .get();
    },
    hasLike: function(blogId, OPENID) {
        return db.collection(collection)
        .where({ blogId, OPENID })
        .get()
        .then(({data}) => {
            return !!data.length;
        });
    },
    LikeCount: function(where) {
        return db.collection(collection).where(where).count().then(({total}) => total);
    }
};

module.exports = likesModel;
