Component({
    options: {
        multipleSlots: true
    },
    properties: {
        item: {
            type: Object,
            value: {
                _id: '', // 博客id
                userInfo: {
                    avatarUrl: '', // 用户头像
                    nickName: '' // 用户姓名
                },
                createTime: '', // 博客创建时间
                logContent: '', // 博客日志
                photoIds: [], // 博客图片id集合
                isCreator: false // 是否创建者
            },
        }
    },
    data: {
    },
    methods: {
        previewImage: function(evt) {
            const { url } = evt.currentTarget.dataset;

            const { photoIds } = this.data.item;
            wx.previewImage({
                current: url,
                urls: photoIds
            });
        }
    }
});
