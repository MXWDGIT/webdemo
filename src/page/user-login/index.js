require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

var formError = {
  show: function (errMsg) {
    $('.error-item').show().find('.err-msg').text(errMsg);
  },
  hide: function () {
    $('.error-item').hide().find('.err-msg').text('');
  }
}

var page = {
  init: function () {
    this.bindEvent();
  },
  bindEvent: function () {
    var _this = this;
    // 登录点击
    $('#submit').click(function () {
      _this.submit();
    });
    // 回车提交
    $('.user-content').keyup(function (e) {
      if (e.keyup === 13) {
        _this.submit();
      }
    })
  },
  submit: function () {
    // 获取用户输入的 val
    var formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val())
    }
    // 表单验证结果
    validateResult = this.formValidate(formData);

    if (validateResult.status) {
      _user.login(formData, function (res) {
        window.location.href = _mm.getUrlParam('redirect') || './index.html'
      }, function (errMsg) {
        formError.show(errMsg);
      })
    } else {
      formError.show(validateResult.msg);
    }

  },
  // 验证表单
  formValidate: function (formData) {
    var result = {
      status: false,
      msg: ''
    };

    if (!_mm.validate(formData.username, 'require')) {
      result.msg = '用户名不能为空';
      return result;
    }

    if (!_mm.validate(formData.password, 'require')) {
      result.msg = '密码不能为空';
      return result
    }

    // 验证通过，返回正确提示
    result.status = true;
    result.msg = '验证通过';
    return result;
  }
}

$(function () {
  page.init();
});