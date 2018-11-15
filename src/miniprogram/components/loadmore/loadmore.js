// components/loadmore/loadmore.js
Component({
    /**
    * 组件的属性列表
    */
    properties: {
        isload: {
            type: Boolean,
            value: false,
            observer(val) {
                this.setData({ isload: val });
            }
        },
        isEmtry: {
            type: Boolean,
            value: false,
            observer(val) {
                this.setData({ isEmtry: val });
            }
        }
    },

    /**
    * 组件的外部类名
    */
    externalClasses: ['loadmore']
});
