require("./index.css");
require("page/common/nav-simple/index.js");
var _user = require("service/user-service.js");
var _mm = require("util/mm.js");

var formError = {
  show: function (errMsg) {
    $('.error-item').show().find('.err-msg').text(errMsg);
  },
  hide: function () {
    $('.error-item').hide().find('.err-msg').text('');
  }
};

var page = {
  data: {
    username: '',
    question: '',
    answer: '',
    token: ''
  },
  init: function () {
    this.bindEvent();
    this.onLoad();
  },
  bindEvent: function () {
    var _this = this;
    // 输入用户名的下一步按钮点击
    $('#submit-username').click(function () {
      var username = $.trim($('#username').val());
      // 用户名存在
      if (username) {
        _user.getQuestion(username, function (res) {
          _this.data.username = username;
          _this.data.question = res;
          _this.loadStepQuestion();
        }, function (errMsg) {
          formError.show(errMsg);
        });
      } else {
        formError.show('请输入用户名');
      }
    });

    // 密码提示问题答案的按钮点击
    $('#submit-question').click(function () {
      var answer = $.trim($('#answer').val());

      // 密码提示问题答案存在
      if (answer) {
        // 检查密码提示问题答案
        _user.checkAnswer({
          username: _this.data.username,
          question: _this.data.question,
          answer: answer
        }, function (res) {
          _this.data.answer = answer;
          _this.data.token = res;
          _this.loadStepPassword();
        }, function (errMsg) {
          formError.show(errMsg);
        });
      }
      // 密码提示问题答案存在不存在
      else {
        formError.show('请输入密码提示问题答案');
      }
    });

    // 输入新密码的按钮点击
    $('#submit-password').click(function () {
      var password = $.trim($('#password').val());
      // 新密码不为空
      if (password && password.length >= 6) {
        // 重置密码
        _user.resetPassword({
          username: _this.data.username,
          passwordNew: password,
          forgetToken: _this.data.token
        }, function (res) {
          window.location.href = './result.html?type=pass-reset';
        }, function (errMsg) {
          formError.show(errMsg);
        });
      }
      // 新密码为空
      else {
        formError.show('请输入不少于6位新密码');
      }
    })
  },
  onLoad: function () {
    this.loadStepUsername();
  },
  // 加载输入用户名
  loadStepUsername: function () {
    $('.step-username').show();
  },
  // 加载密码提示问题答案
  loadStepQuestion: function () {
    // 清除错误提示
    formError.hide();
    // 做容器的切换
    $('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);
  },
  // 加载输入 passwor 的一步
  loadStepPassword: function () {
    $('.step-question').hide().siblings('.step-password').show();
  }
}

$(function () {
  page.init();
})