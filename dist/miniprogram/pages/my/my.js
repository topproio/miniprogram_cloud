import dataStore from '../../utils/dataStore';

Page({
    data: {
        nickName: {},
        avatarUrl: ''
    },

    onLoad: function() {
        const {nickName, avatarUrl} = dataStore.get('userInfo');
        this.setData({nickName, avatarUrl});
    }
});
