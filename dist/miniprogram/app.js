import dataStore from './utils/dataStore';

App({
    onLaunch: function() {
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力');
        } else {
            wx.cloud.init({
                traceUser: true,
            });
        }

        this.checkUserInfo();
    },
    checkUserInfo: function() {
        wx.getUserInfo({
            success: function(res) {
                dataStore.put('userInfo', res.userInfo);
            },
            fail: function() {
                wx.reLaunch({ url: '/pages/GetUserInfo/GetUserInfo'});
            }
        });
    },
});
