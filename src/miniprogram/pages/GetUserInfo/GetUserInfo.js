import dataStore from '../../utils/dataStore';

Page({
    onGotUserInfo: function(evt) {
        const userInfo = evt.detail.userInfo;
        dataStore.put('userInfo', userInfo);
        wx.reLaunch({ url: '/pages/index/index'});
    }
});
