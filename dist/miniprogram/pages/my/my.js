import dataStore from '../../utils/dataStore';

Page({
    data: {
        nickName: {},
        avatarUrl: 0
    },

    onLoad: function() {
        const {nickName, avatarUrl} = dataStore.get('userInfo');
        this.setData({nickName, avatarUrl});
    }
});
