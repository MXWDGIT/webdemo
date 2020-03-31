webpackJsonp([4],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(47);


/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(22);
	var _mm = __webpack_require__(24);
	var _user = __webpack_require__(28);
	var _cart = __webpack_require__(29);

	var nav = {
	  init: function () {
	    this.bindEvent();
	    this.loadUserInfo();
	    this.loadCartCount();
	    return this;
	  },
	  // 事件处理
	  bindEvent: function () {
	    // 登录点击
	    $('.js-login').click(function () {
	      _mm.doLogin();
	    });
	    // 注册点击
	    $('.js-register').click(function () {
	      window.location.href = './user-register.html';
	    });
	    // 退出点击
	    $('.js-logout').click(function () {
	      _user.logout(function (res) {
	        window.location.reload();
	      }, function (errMsg) {
	        _mm.errorTips(errMsg);
	      });
	    });
	  },
	  // 用户信息，判断登录状态
	  loadUserInfo: function () {
	    _user.checkLogin(function (res) {
	      $('.user.no-login').hide().siblings('.user.login').show().find('.username').text(res.username);
	    }, function (errMsg) {
	      // do nothing
	    });
	  },
	  // 加载购物车数量
	  loadCartCount: function () {
	    _cart.getCartCount(function (res) {
	      $('.nav .cart-count').text(res || 0);
	    }, function (errMsg) {
	      $('.nav .cart-count').text(0);
	    });
	  }
	}

	module.exports = nav.init();

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

	var _mm = __webpack_require__(24);
	var _user = {
	  // 检测用户名
	  checkUsername: function (username, resolve, reject) {
	    _mm.request({
	      url: _mm.getServerUrl('/user/check_valid.do'),
	      data: {
	        type: 'username',
	        stt: username
	      },
	      method: 'POST',
	      success: resolve,
	      error: reject
	    });
	  },
	  // 用户注册
	  register: function (userInfo, resolve, reject) {
	    _mm.request({
	      url: _mm.getServerUrl('/user/register.do'),
	      data: userInfo,
	      method: 'POST',
	      success: resolve,
	      error: reject
	    });
	  },
	  // 用户登录
	  login: function (userInfo, resolve, reject) {
	    _mm.request({
	      url: _mm.getServerUrl('/user/login.do'),
	      data: userInfo,
	      method: 'POST',
	      success: resolve,
	      error: reject
	    });
	  },
	  //检查登录状态
	  checkLogin: function (resolve, reject) {
	    _mm.request({
	      url: _mm.getServerUrl('/user/get_user_info.do'),
	      method: 'POST',
	      success: resolve,
	      error: reject
	    });
	  },
	  // 获取用户密码提示问题
	  getQuestion: function (username, resolve, reject) {
	    _mm.request({
	      url: _mm.getServerUrl('/user/forget_get_question.do'),
	      data: {
	        username: username
	      },
	      method: 'POST',
	      success: resolve,
	      error: reject
	    });
	  },
	  // 检查密码提示问题答案
	  checkAnswer: function (userInfo, resolve, reject) {
	    _mm.request({
	      url: _mm.getServerUrl('/user/forget_check_answer.do'),
	      data: userInfo,
	      method: 'POST',
	      success: resolve,
	      error: reject
	    });
	  },
	  // 重置密码 / 找回密码
	  resetPassword: function (userInfo, resolve, reject) {
	    _mm.request({
	      url: _mm.getServerUrl('/user/forget_reset_password.do'),
	      data: userInfo,
	      method: 'POST',
	      success: resolve,
	      error: reject
	    });
	  },
	  //获取用户信息
	  getUserInfo: function (resolve, reject) {
	    _mm.request({
	      url: _mm.getServerUrl('/user/get_information.do'),
	      method: 'POST',
	      success: resolve,
	      error: reject
	    });
	  },
	  //更新用户信息
	  updateUserInfo: function (userInfo, resolve, reject) {
	    _mm.request({
	      url: _mm.getServerUrl('/user/update_information.do'),
	      data: userInfo,
	      method: 'POST',
	      success: resolve,
	      error: reject
	    });
	  },
	  //登录状态下更新密码
	  updatePassword: function (userInfo, resolve, reject) {
	    _mm.request({
	      url: _mm.getServerUrl('/user/reset_password.do'),
	      data: userInfo,
	      method: 'POST',
	      success: resolve,
	      error: reject
	    });
	  },
	  //登出
	  logout: function (resolve, reject) {
	    _mm.request({
	      url: _mm.getServerUrl('/user/logout.do'),
	      method: 'POST',
	      success: resolve,
	      error: reject
	    });
	  }
	}
	module.exports = _user;

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

	var _mm = __webpack_require__(24);
	var _cart = {
	  // 获取购物车数量
	  getCartCount: function (resolve, reject) {
	    _mm.request({
	      url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
	      success: resolve,
	      error: reject
	    })
	  }
	}

	module.exports = _cart;

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(31);
	var _mm = __webpack_require__(24);

	var header = {
	  /**
	   * 假如我们输入手机点搜索，进入 list 页以后，我们 input 上显示的是手机或为空
	   * 要根据 url 参数来回填
	   * 回填就是在 header 一加载的时候，我们去读一下他的 url 信息，
	   * 然后把内容回填进去。
	   * 
	   * 搜索提交
	   */
	  init: function () {
	    this.bindEvent();
	    this.onLoad();
	  },
	  onLoad: function () {
	    // 获取 url 中的关键字，比如手机, 然后回填 input
	    var keyword = _mm.getUrlParam('keyword');
	    if (keyword) {
	      $('#search-input').text(keyword);
	    }
	  },
	  bindEvent: function () {
	    var _this = this;
	    // 搜索提交
	    $('#search-btn').click(function () {
	      _this.searchSubmit();
	    });

	    $('#search-input').keyup(function (e) {
	      if (e.keyCode === 13) {
	        _this.searchSubmit();
	      }
	    })
	  },
	  // 搜索提交
	  searchSubmit: function () {
	    var keyword = $.trim($('#search-input').val());

	    if (keyword) {
	      window.location.href = './list.html?keyword=' + keyword;
	    } else {
	      _mm.goHome();
	    }
	  }
	}

	header.init();

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(34);
	var _mm = __webpack_require__(24);
	var templateIndex = __webpack_require__(36);

	var navSide = {
	  option: {
	    name: '',
	    navList: [{
	        name: 'user-center',
	        desc: '个人中心',
	        href: './user-center.html'
	      },
	      {
	        name: 'order-list',
	        desc: '我的订单',
	        href: './order-list.html'
	      },
	      {
	        name: 'user-pass-update',
	        desc: '修改密码',
	        href: './user-pass-update.html'
	      },
	      {
	        name: 'about',
	        desc: '关于MMall',
	        href: './about.html'
	      }
	    ]
	  },
	  init: function (option) {
	    $.extend(this.option, option);
	    this.renderNav();
	  },
	  // 渲染侧边栏
	  renderNav: function () {
	    // 计算 acrive 属性
	    for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
	      if (this.option.navList[i].name === this.option.name) {
	        this.option.navList[i].isActive = true;
	      }
	    };
	    // 创建模板并传入数据
	    var navHtml = _mm.renderHtml(templateIndex, {
	      navList: this.option.navList
	    });
	    // 把渲染好的模板放入 ul 
	    $('.nav-side').html(navHtml);
	  },
	};
	module.exports = navSide;

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 36:
/***/ (function(module, exports) {

	module.exports = "{{#navList}} {{#isActive}} <li class=\"nav-item active\"> {{/isActive}} {{^isActive}} </li><li class=\"nav-item\"> {{/isActive}} <a class=\"link\" href=\"{{href}}\">{{desc}}</a> </li> {{/navList}} ";

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(48);
	__webpack_require__(21);
	__webpack_require__(30);
	var navSide = __webpack_require__(33);
	var _user = __webpack_require__(28);
	var _mm = __webpack_require__(24);
	var templateIndex = __webpack_require__(50);



	var page = {
	  init: function () {
	    this.onLoad();
	    this.bindEvent();
	  },
	  bindEvent: function () {
	    var _this = this;
	    // 提交按钮点击
	    $(document).on('click', '.btn-submit', function () {
	      var userInfo = {
	          phone: $.trim($('#phone').val()),
	          email: $.trim($('#email').val()),
	          question: $.trim($('#question').val()),
	          answer: $.trim($('#answer').val())
	        },
	        validateResult = _this.validateResult(userInfo);

	      if (validateResult.status) {
	        // 更改用户信息
	        _user.updateUserInfo(userInfo, function (res, msg) {
	          _mm.successTips(msg);
	          window.location.href = './user-center.html';
	        }, function (errMsg) {
	          _mm.errorTips(errMsg);
	        });
	      } else {
	        _mm.errorTips(validateResult.msg);
	      }
	    });
	  },
	  onLoad: function () {
	    // 初始化左侧菜单
	    navSide.init({
	      name: 'user-center'
	    });

	    // 加载用户信息
	    this.loadUserInfo();
	  },
	  // 初始化用户信息
	  loadUserInfo: function () {
	    var userHtml = '';
	    _user.getUserInfo(function (res) {
	      userHtml = _mm.renderHtml(templateIndex, res);
	      $('.panel-body').html(userHtml);
	    }, function (errMsg) {
	      _mm.errorTips(errMsg);
	    })
	  },
	  // 验证字段信息
	  validateResult: function (userInfo) {
	    var result = {
	      status: false,
	      msg: ''
	    };

	    // 验证手机号
	    if (!_mm.validate(userInfo.phone, 'phone')) {
	      result.msg = '手机号格式不正确';
	      return result;
	    }

	    // 验证邮箱格式
	    if (!_mm.validate(userInfo.email, 'email')) {
	      result.msg = '邮箱格式不正确';
	      return result;
	    }
	    // 验证密码提示问题是否为空
	    if (!_mm.validate(userInfo.question, 'require')) {
	      result.msg = '密码提示问题不能为空';
	      return result;
	    }
	    // 验证密码提示问题答案是否为空
	    if (!_mm.validate(userInfo.answer, 'require')) {
	      result.msg = '密码提示问题答案不能为空';
	      return result;
	    }

	    // 通过验证，返回正确提示
	    result.status = true;
	    result.msg = '验证通过';
	    return result;
	  }
	}

	$(function () {
	  page.init();
	});

/***/ }),

/***/ 48:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 50:
/***/ (function(module, exports) {

	module.exports = "<div class=\"user-info\"> <div class=\"form-line\"> <span class=\"label\">用户名：</span> <span class=\"text\">{{ username }}</span> </div> <div class=\"form-line\"> <span class=\"label\">电 话：</span> <input class=\"input\" id=\"phone\" autocomplete=\"off\" value=\"{{ phone }}\"> </div> <div class=\"form-line\"> <span class=\"label\">邮 箱：</span> <input class=\"input\" id=\"email\" autocomplete=\"off\" value=\"{{ email }}\"> </div> <div class=\"form-line\"> <span class=\"label\">问 题：</span> <input class=\"input\" id=\"question\" autocomplete=\"off\" value=\"{{ question }}\"> </div> <div class=\"form-line\"> <span class=\"label\">答 案：</span> <input class=\"input\" id=\"answer\" autocomplete=\"off\" value=\"{{ answer }}\"> </div> <span class=\"btn btn-submit\">提交</span> </div>";

/***/ })

});