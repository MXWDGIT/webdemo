webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var _mm = __webpack_require__(3);
	console.log(_mm.getUrlParam('test'));

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	var conf = {
	  serverHost: ''
	}
	var _mm = {
	  // 向后端请求数据
	  request: function (param) {
	    var _this = this
	    $.ajax({
	      type: param.method || "get",
	      url: param.url || "",
	      dataType: param.type || "json",
	      data: param.data || "",
	      success(res) {
	        // 请求成功
	        if (0 === res.status) {
	          typeof param.success === "function" && param.success(res.data, res.msg);
	        }
	        // 没有登录状态，需要强制登录
	        else if (10 === res.status) {
	          _this.doLogin();
	        }
	        // 请求数据错误
	        else if (1 === res.status) {
	          typeof param.error === "function" && param.error(res.msg);
	        }
	      },
	      error(err) {
	        typeof param.error === "function" && param.error(err.statusText);
	      }
	    })
	  },
	  // 获取服务器地址
	  getServerUrl: function (path) {
	    return conf.serverHost + path
	  },
	  // 获取 url 参数
	  getUrlParam: function (name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var result = window.location.search.substr(1).match(reg);
	    return result ? decodeURIComponent(result[2]) : null;
	  },
	  // 跳转首页
	  doLogin: function () {
	    window.location.href = "./user-login.html?redirect=" + odeURIComponent(window.location.href);
	  }
	}

	module.exports = _mm;

/***/ })
]);