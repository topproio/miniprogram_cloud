const cloud = require('wx-server-sdk');

cloud.init();

const file = {
    getTempFileURLById: function(ids) {
        if (!ids.length) {
            return Promise.resolve([]);
        }

        return cloud.getTempFileURL({ fileList: ids }).then(({fileList}) => {
            return fileList.map(({tempFileURL}) => tempFileURL);
        });
    }
};

module.exports = file;
