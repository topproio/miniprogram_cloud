const path = require('path');
const cloud = require('wx-server-sdk');

cloud.init();

exports.main = (event) => {
    const { controller, action, option } = event;
    /* eslint-disable */
    const _controller = require(path.join(__dirname, './controllers/' + controller));

    const auth = cloud.getWXContext();
    const data = _controller[action]( auth, option )

    return data;
};
