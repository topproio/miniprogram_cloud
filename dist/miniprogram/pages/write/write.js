import dom from '../../utils/dom';
import dataStore from '../../utils/dataStore';
import date from '../../utils/date';

const { inputBuilding } = dom;
const { pattern } = date;

Page({

    data: {
        logContent: '',
        photoList: [],
        photoListMax: 9
    },

    inputBuilding,

    submitHandle: function() {
        const {logContent, photoList, isLoading} = this.data;
        const userInfo = dataStore.get('userInfo');

        if (isLoading || !this.submitValidator(logContent)) return;

        wx.showLoading({mask: true});

        this.uploadPhotoRequest(photoList).then(photoIds => {
            return this.createBlogRequest({logContent, photoIds, userInfo});
        }).then(() => {
            wx.hideLoading();
            wx.showToast({ title:'提交成功' });

            dataStore.put('hasNewBlog', true);
            setTimeout(() => { wx.navigateBack({ delta: 1 }); }, 1000);
        }).catch(() => {
            wx.hideLoading();

            const title = '提交失败', icon = 'none';
            wx.showToast({ title, icon});
        });
    },

    uploadPhotoHandle: function() {
        const canUploadCount = this.data.photoListMax - this.data.photoList.length;

        wx.chooseImage({
            count: canUploadCount,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                const photoList = this.data.photoList.concat(res.tempFilePaths);
                this.setData({ photoList });
            }
        });
    },

    submitValidator: function(val) {
        if (!val) {
            const title = '请输入文本', icon = 'none';
            wx.showToast({ title, icon});
            return false;
        }

        return true;
    },

    uploadPhotoRequest: function(tems) {
        if (!tems.length) {
            return Promise.resolve([]);
        }

        const PromiseAll = tems.map(tem => {
            return wx.cloud.uploadFile({
                cloudPath: pattern(new Date(), 'yyyy/MM/dd') + '/' + Math.random().toFixed(4),
                filePath: tem, // 小程序临时文件路径
            });
        });
        return Promise.all(PromiseAll).then(res => res.map(item => item.fileID));
    },

    createBlogRequest: function(data) {
        return wx.cloud.callFunction({
            name: 'api',
            data: {
                controller: 'BlogController',
                action: 'create',
                option: data
            }
        });
    },
});
