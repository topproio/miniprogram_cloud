const dom = {
    /*
    ** 输入框值与data绑定
    */
    inputBuilding: function(evt) {
        let val = evt.detail.value,
            data = evt.target.dataset.bind;
        this.setData({ [data]: val });
    }
};

export default dom;
