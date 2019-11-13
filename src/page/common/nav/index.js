require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

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
      $('.user .no-login').hide().siblings('.user .login').show().find('.username').text(res.username);
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