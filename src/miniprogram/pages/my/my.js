import dataStore from '../../utils/dataStore';

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
                controller: 'likeController',
                action: 'likeCount'
            }
        });
    }
});
