/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 61);
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bus = function () {
    _createClass(Bus, null, [{
        key: 'getInstance',
        value: function getInstance() {
            if (!Bus.instance) {
                Bus.instance = new Bus();
            }
            return Bus.instance;
        }
    }]);

    function Bus() {
        _classCallCheck(this, Bus);

        this._watcher = {};
    }

    _createClass(Bus, [{
        key: 'on',
        value: function on(name, handler) {
            if (!(handler instanceof Function)) {
                throw Error('第二个参数应该是函数,但获取的是' + (typeof handler === 'undefined' ? 'undefined' : _typeof(handler)));
            }

            if (this._watcher[name]) {
                this._watcher[name].push(handler);
            } else {
                this._watcher[name] = [handler];
            }
            return this;
        }
    }, {
        key: 'emit',
        value: function emit(name) {
            if (!this._watcher[name]) return;
            var args = Array.prototype.slice.call(arguments, 1);
            this._watcher[name].forEach(function (handler) {
                handler.apply(null, args);
            });

            return this;
        }
    }, {
        key: 'off',
        value: function off(name, handler) {
            var index = this._watcher[name].indexOf(handler);

            if (index < 0) return this;
            this._watcher[name].splice(index, 1);
            return this;
        }
    }]);

    return Bus;
}();

exports.default = Bus.getInstance();

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * pattern(new Date(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 * pattern(new Date(), 'yyyy-MM-dd E HH:mm:ss') ==> 2009-03-10 二 20:09:04
 * pattern(new Date(), 'yyyy-MM-dd EE hh:mm:ss') ==> 2009-03-10 周二 08:09:04
 * pattern(new Date(), 'yyyy-MM-dd EEE hh:mm:ss') ==> 2009-03-10 星期二 08:09:04
 * pattern(new Date(), 'yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
 */
var date = {
    pattern: function pattern(_date, fmt) {
        var date = _date instanceof Date ? _date : new Date(_date);

        var o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
            'H+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds() // 毫秒
        };

        var week = {
            '0': '日',
            '1': '一',
            '2': '二',
            '3': '三',
            '4': '四',
            '5': '五',
            '6': '六'
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? '星期' : '周' : '') + week[date.getDay() + '']);
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return fmt;
    }
};

exports.default = date;

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(62);


/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _date = __webpack_require__(5);

var _date2 = _interopRequireDefault(_date);

var _bus = __webpack_require__(4);

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pattern = _date2.default.pattern;


var fetchBlogOption = {
    page: 1,
    paginate: 10
};

Page({
    data: {
        blogArr: [],
        isload: false,
        isEmtry: false
    },

    onLoad: function onLoad() {
        var _this = this;

        this.fetchBlogRequestEvent().then(function (result) {
            _this.setData({ blogArr: result });
        });
    },

    onPullDownRefresh: function onPullDownRefresh() {
        var _this2 = this;

        this.setData({ isEmtry: false });
        fetchBlogOption.page = 1;

        this.fetchBlogRequestEvent().then(function (result) {
            _this2.setData({ blogArr: result });
            wx.stopPullDownRefresh();
        }).catch(wx.stopPullDownRefresh);
    },

    onReachBottom: function onReachBottom() {
        var _this3 = this;

        if (this.data.isload || this.data.isEmtry) return;

        fetchBlogOption.page++;
        this.fetchBlogRequestEvent().then(function (result) {
            var blogArr = _this3.data.blogArr.concat(result);
            _this3.setData({ blogArr: blogArr });
        });
    },

    fetchBlogRequestEvent: function fetchBlogRequestEvent() {
        var _this4 = this;

        this.setData({ isload: true });
        return wx.cloud.callFunction({
            name: 'api',
            data: {
                controller: 'BlogController',
                action: 'fetchListWithLike',
                option: fetchBlogOption
            }
        }).then(function (res) {
            _this4.setData({ isload: false });

            if (!res.result.length) {
                // 如果没有
                _this4.setData({ isEmtry: true });
                return [];
            }

            return _this4.transformBlogData(res.result);
        }).catch(function (err) {
            _this4.setData({ isload: false });
            return err;
        });
    },

    deleteBlogHandle: function deleteBlogHandle(evt) {
        var that = this;

        wx.showModal({
            content: '是否确认删除',
            success: function success(res) {
                if (res.cancel) return;
                wx.showLoading();

                var _evt$currentTarget$da = evt.currentTarget.dataset,
                    id = _evt$currentTarget$da.id,
                    photoids = _evt$currentTarget$da.photoids,
                    index = _evt$currentTarget$da.index;

                that.deleteBlogRequest({ id: id, photoids: photoids }).then(function () {
                    var hasLike = that.data.blogArr[index].hasLike;


                    that.data.blogArr.splice(index, 1);
                    that.setData({ blogArr: that.data.blogArr });
                    wx.hideLoading();

                    _bus2.default.emit('deleteBlogEvent', id);
                    if (hasLike) {
                        _bus2.default.emit('mulLike');
                    }
                }).catch(wx.hideLoading);
            }
        });
    },

    deleteBlogRequest: function deleteBlogRequest(option) {
        return wx.cloud.callFunction({
            name: 'api',
            data: {
                controller: 'BlogController',
                action: 'delete',
                option: option
            }
        });
    },

    transformBlogData: function transformBlogData(BlogArr) {
        // 增加点赞加载状态
        return BlogArr.map(function (blog) {
            blog.likeLoad = false;
            blog.createTime = pattern(blog.createTime, 'yyyy-MM-dd HH:mm:ss');
            return blog;
        });
    },

    likeBlogHandle: function likeBlogHandle(evt) {
        var _this5 = this;

        var _evt$currentTarget$da2 = evt.currentTarget.dataset,
            id = _evt$currentTarget$da2.id,
            index = _evt$currentTarget$da2.index;
        var _data$blogArr$index = this.data.blogArr[index],
            likeLoad = _data$blogArr$index.likeLoad,
            likeCount = _data$blogArr$index.likeCount,
            hasLike = _data$blogArr$index.hasLike;

        if (likeLoad) return;

        var likeLoadKey = 'blogArr[' + index + '].likeLoad';
        this.setData(_defineProperty({}, likeLoadKey, true));

        var _requestFunc = hasLike ? this.unLikeRequest : this.likeRequest;

        _requestFunc({ blogId: id }).then(function () {
            var _this5$setData;

            var likeCountKey = 'blogArr[' + index + '].likeCount';
            var hasLikeKey = 'blogArr[' + index + '].hasLike';

            var newCount = hasLike ? likeCount - 1 : likeCount + 1;

            _this5.setData((_this5$setData = {}, _defineProperty(_this5$setData, likeLoadKey, false), _defineProperty(_this5$setData, likeCountKey, newCount), _defineProperty(_this5$setData, hasLikeKey, !hasLike), _this5$setData));
            _bus2.default.emit('likeEvent', id, hasLike);
        }).catch(function () {
            _this5.setData(_defineProperty({}, likeLoadKey, false));
        });
    },

    likeRequest: function likeRequest(option) {
        return wx.cloud.callFunction({
            name: 'api',
            data: {
                controller: 'LikeController',
                action: 'like',
                option: option
            }
        });
    },

    unLikeRequest: function unLikeRequest(option) {
        return wx.cloud.callFunction({
            name: 'api',
            data: {
                controller: 'LikeController',
                action: 'unLike',
                option: option
            }
        });
    }
});

/***/ })

/******/ });