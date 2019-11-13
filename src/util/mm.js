var Hogan = require("hogan.js");
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
    /**
     * window.location.search 获取的是 从问号 (?) 开始的 URL（查询部分）
     * .substr(1) 返回一个从指定位置开始的指定长度的子字符串  这里设置为1，是为了把url中的?号去掉
     * .match 使用正则表达式模式对字符串执行查找，并将包含查找的结果作为数组返回
     */
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  // 渲染 html 模板
  renderHtml: function (htmlTemplate, data) {
    var template = Hogan.compile(htmlTemplate),
      result = template.render(data);
    return result;
  },
  // 字段验证，支持非空，手机，邮箱的判断
  validate: function (value, type) {
    var value = $.trim(value);
    // 非空验证
    if ('require' === type) {
      return !!value;
    }
    // 手机号验证
    if ('phone' === type) {
      return /^1\d{10}$/.test(value);
    }
    // 邮箱雁阵
    if ('email' === type) {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    }
  },
  // 成功提示
  successTips: function (msg) {
    alert(msg || "操作成功")
  },
  // 失败提示
  errorTips: function (msg) {
    alert(msg || "操作失败，哪里不对！")
  },
  // 统一登录处理
  doLogin: function () {
    window.location.href = "./user-login.html?redirect=" + encodeURIComponent(window.location.href);
  },
  // 返回首页
  gohome: function () {
    window.location.href = "./index.html";
  }
}

module.exports = _mm;