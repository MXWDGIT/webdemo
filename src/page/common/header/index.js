require('./index.css');
var _mm = require('util/mm.js');

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