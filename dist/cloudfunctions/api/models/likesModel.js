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
    show: function(OPENID, blogId) {
        return db.collection(collection)
            .where({ OPENID, blogId })
            .field({ _id: true })
            .get()
            .then(res => res.data);
    },
    hasLike: function(blogId, OPENID) {
        return db.collection(collection).where({ blogId, OPENID }).get().then(({data}) => {
            return !!data.length;
        });
    },
    LikeCount: function(blogId) {
        return db.collection(collection).where({ blogId }).count().then(({total}) => total);
    }
};

module.exports = likesModel;
