require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');



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