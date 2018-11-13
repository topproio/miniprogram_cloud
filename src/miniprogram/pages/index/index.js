Page({
    data: {
        blogArr: []
    },

    onLoad: function() {
        const that = this;

        wx.cloud.callFunction({
            name: 'api',
            data: {
                controller: 'BlogController',
                action: 'fetchList'
            }
        }).then(({result}) => {
            that.setData({ blogArr: result });
        });
    }
});
