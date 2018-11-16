import dataStore from '../../utils/dataStore';
import bus from '../../utils/bus';

Page({
    data: {
        nickName: {},
        avatarUrl: '',
        likeCount: 0
    },

    onLoad: function() {
        const {nickName, avatarUrl} = dataStore.get('userInfo');
        this.setData({nickName, avatarUrl});

        this.likeCountRequest().then(({result}) => {
            this.setData({ likeCount: result });
        });

        bus.on('likeEvent', this.$OnLikeEvent)
            .on('mulLike', this.$OnMulLike);
    },

    onUnload: function() {
        bus.off('likeEvent', this.$OnLikeEvent)
            .off('mulLike', this.$OnMulLike);
    },

    onPullDownRefresh: function() {
        this.likeCountRequest().then(({result}) => {
            this.setData({ likeCount: result });
            wx.stopPullDownRefresh();
        }).catch(wx.stopPullDownRefresh);
    },

    likeCountRequest: function() {
        return wx.cloud.callFunction({
            name: 'api',
            data: {
                controller: 'LikeController',
                action: 'likeCount'
            }
        });
    },

    $OnLikeEvent: function(id, hasLike) {
        let likeCount = hasLike ? this.data.likeCount - 1 : this.data.likeCount + 1;
        this.setData({ likeCount });
    },

    $OnMulLike: function() {
        let likeCount = this.data.likeCount - 1;
        this.setData({ likeCount });
    }
});
