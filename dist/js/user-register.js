webpackJsonp([8],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(60);


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

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(41);

/***/ }),

/***/ 41:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	__webpack_require__(40);
	var _user = __webpack_require__(28);
	var _mm = __webpack_require__(24);

	// 表单的错误提示
	var formError = {
	  show: function (errMsg) {
	    $('.error-item').show().find('.err-msg').text(errMsg);
	  },
	  hide: function () {
	    $('.error-item').hide().find('.err-msg').text('');
	  }
	};


	var page = {
	  init: function () {
	    this.bindEvent();
	  },
	  bindEvent: function () {
	    var _this = this;
	    // 验证用户名
	    $('#username').blur(function () {
	      var username = $.trim($(this).val());
	      // 如果用户名为空，不做验证
	      if (!username) {
	        return;
	      }
	      // 异步验证用户名是否合规
	      _user.checkUsername(username, function (res) {
	        formError.hide();
	      }, function (errMsg) {
	        formError.show(errMsg);
	      })
	    });

	    // 注册点击
	    $('#submit').click(function () {
	      _this.submit();
	    })

	    // 回车提交
	    $('.user-content').keyup(function (e) {
	      if (e.keyCode === 13) {
	        _this.submit();
	      }
	    });
	  },
	  // 提交表单
	  submit: function () {
	    // 表单数据
	    var formData = {
	        username: $.trim($('#username').val()),
	        password: $.trim($('#password').val()),
	        passwordConfirm: $.trim($('#password-confirm').val()),
	        phone: $.trim($('#phone').val()),
	        email: $.trim($('#email').val()),
	        question: $.trim($('#question').val()),
	        answer: $.trim($('#answer').val())
	      },
	      validateResult = this.formValidate(formData);

	    // 验证成功
	    if (validateResult.status) {
	      // 注册
	      _user.register(formData, function (res) {
	        window.location.href = './result.html?type=register';
	      }, function (errMsg) {
	        formError.show(errMsg);
	      });
	    }
	    // 验证失败
	    else {
	      formError.show(validateResult.msg);
	    }
	  },
	  // 表单字段验证
	  formValidate: function (formData) {
	    var result = {
	      status: false,
	      msg: ''
	    };
	    // 验证用户名是否为空
	    if (!_mm.validate(formData.username, 'require')) {
	      result.msg = '用户名不能为空';
	      return result;
	    }
	    // 验证密码是否为空
	    if (!_mm.validate(formData.password, 'require')) {
	      result.msg = '密码不能为空';
	      return result;
	    }
	    // 验证密码长度
	    if (formData.password.length < 6) {
	      result.msg = '密码长度不能少于6位';
	      return result;
	    }
	    // 验证两次输入的密码是否一致
	    if (formData.password !== formData.passwordConfirm) {
	      result.msg = '两次输入的密码不一致';
	      return result;
	    }
	    // 验证手机号
	    if (!_mm.validate(formData.phone, 'phone')) {
	      result.msg = '手机号格式不正确';
	      return result;
	    }
	    // 验证邮箱格式
	    if (!_mm.validate(formData.email, 'email')) {
	      result.msg = '邮箱格式不正确';
	      return result;
	    }
	    // 验证密码提示问题是否为空
	    if (!_mm.validate(formData.question, 'require')) {
	      result.msg = '密码提示问题不能为空';
	      return result;
	    }
	    // 验证密码提示问题答案是否为空
	    if (!_mm.validate(formData.answer, 'require')) {
	      result.msg = '密码提示问题答案不能为空';
	      return result;
	    }
	    // 通过验证，返回正确提示
	    result.status = true;
	    result.msg = '验证通过';
	    return result;
	  }
	};

	$(function () {
	  page.init();
	});

/***/ }),

/***/ 61:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});