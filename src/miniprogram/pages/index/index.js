import dataStore from '../../utils/dataStore';

let fetchBlogOption = {
    page: 1,
    paginate: 10
};

Page({
    data: {
        blogArr: [],
        isload: false,
        isEmtry: false
    },

    onLoad: function() {
        dataStore.put('indexPage', this);

        this.fetchBlogRequestEvent().then(result => {
            this.setData({ blogArr: result });
        });
    },

    onShow: function() {
        if (dataStore.get('hasNewBlog')) {
            wx.startPullDownRefresh();
        }
    },

    onPullDownRefresh: function() {
        this.setData({ isEmtry: false });
        fetchBlogOption.page = 1;

        this.fetchBlogRequestEvent().then(result => {
            this.setData({ blogArr: result });
            dataStore.put('hasNewBlog', false);
            wx.stopPullDownRefresh();
        }).catch(wx.stopPullDownRefresh);
    },

    onReachBottom: function() {
        if (this.data.isload || this.data.isEmtry) return;

        fetchBlogOption.page++;
        this.fetchBlogRequestEvent().then(result => {
            const blogArr = this.data.blogArr.concat(result);
            this.setData({ blogArr: blogArr });
        });
    },

    fetchBlogRequestEvent: function() {
        this.setData({ isload: true });
        return wx.cloud.callFunction({
            name: 'api',
            data: {
                controller: 'BlogController',
                action: 'fetchList',
                option: fetchBlogOption
            }
        }).then(res => {
            this.setData({ isload: false });

            if (!res.result.length) { // 如果没有
                this.setData({ isEmtry: true });
                return [];
            }

            return this.transformBlogData(res.result);
        }).catch(err => {
            this.setData({ isload: false });
            return err;
        });
    },

    transformBlogData: function(BlogArr) {
        // 增加点赞加载状态
        return BlogArr.map(blog => {
            blog.likeLoad = false;
            return blog;
        });
    },

    deleteBlogHandle: function(evt) {
        const that = this;

        wx.showModal({
            content: '是否确认删除',
            success: function(res) {
                if (res.cancel) return;
                wx.showLoading();

                const {id, photoids, index} = evt.currentTarget.dataset;
                that.deleteBlogRequest({id, photoids}).then(() => {
                    that.data.blogArr.splice(index, 1);
                    that.setData({ blogArr: that.data.blogArr });
                    wx.hideLoading();
                }).catch(wx.hideLoading);
            }
        });
    },

    deleteBlogRequest: function(option) {
        return wx.cloud.callFunction({
            name: 'api',
            data: {
                controller: 'BlogController',
                action: 'delete',
                option
            }
        });
    },

    likeBlogHandle: function(evt) {
        const { id, index } = evt.currentTarget.dataset;
        let { likeLoad, likeCount, hasLike } = this.data.blogArr[index];
        if (likeLoad) return;

        const likeLoadKey = `blogArr[${index}].likeLoad`;
        this.setData({ [likeLoadKey]: true });

        const _requestFunc = hasLike ? this.unLikeRequest : this.likeRequest;
        _requestFunc({blogId: id}).then(() => {
            const likeCountKey = `blogArr[${index}].likeCount`;
            const hasLikeKey = `blogArr[${index}].hasLike`;

            const newCount = hasLike ? likeCount - 1 : likeCount + 1;

            this.setData({ [likeLoadKey]: false, [likeCountKey]: newCount, [hasLikeKey]: !hasLike });
        }).catch(() => {
            this.setData({ [likeLoadKey]: false });
        });
    },

    likeRequest: function(option) {
        return wx.cloud.callFunction({
            name: 'api',
            data: {
                controller: 'likeController',
                action: 'like',
                option
            }
        });
    },

    unLikeRequest: function(option) {
        return wx.cloud.callFunction({
            name: 'api',
            data: {
                controller: 'likeController',
                action: 'unLike',
                option
            }
        });
    }
});
