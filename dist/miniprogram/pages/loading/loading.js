import dataStore from '../../utils/dataStore';

Page({
    onLoad: function() {
        wx.getUserInfo({
            success: function(res) {
                dataStore.put('userInfo', res.userInfo);
                wx.reLaunch({ url: '/pages/index/index'});
            },
            fail: function() {
                wx.reLaunch({ url: '/pages/GetUserInfo/GetUserInfo'});
            }
        });
    }
});
