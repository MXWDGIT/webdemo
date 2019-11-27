var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置 dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 抽离 html 模板插件
var getHtmlConfig = function (name, title) {
  return {
    // 本地模板的位置
    template: './src/view/' + name + '.html',
    // 输出文件的文件名称
    filename: 'view/' + name + '.html',
    // 添加特定favicon路径到输出的html文档中，这个同title配置项，需要在模板中动态获取其路径值
    favicon: './favicon.ico',
    title: title,
    // 向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同  true或者body：所有JavaScript资源插入到body元素的底部
    inject: true,
    // 是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值
    hash: true,
    // 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中
    chunks: ['common', name]
  }
}

var config = {
  // 定义入口文件
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'user-login': ['./src/page/user-login/index.js'],
    'user-register': ['./src/page/user-register/index.js'],
    'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
    'user-center': ['./src/page/user-center/index.js'],
    'user-center-update': ['./src/page/user-center-update/index.js'],
    'user-pass-update': ['./src/page/user-pass-update/index.js'],
    'result': ['./src/page/result/index.js'],
  },
  // 定义构建后文件的出口
  output: {
    path: __dirname + '/dist/',
    publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
    filename: 'js/[name].js'
  },
  // 插件
  plugins: [
    // 独立通用模块到 base.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    // 独立 css 文件
    new ExtractTextPlugin("css/[name].css"),
    // html 模板的处理
    new htmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new htmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
    new htmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
    new htmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
    new htmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
    new htmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
    new htmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
    new htmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
  ],
  // 关于模块的加载相关
  module: {
    loaders: [{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=300&name=resource/[name].[ext]'
      },
      {
        test: /\.string$/,
        loader: 'html-loader',
        query: {
          minimize: true,
          removeAttributeQuotes: false
        }
      }
    ]
  },
  resolve: {
    alias: {
      node_modules: __dirname + '/node_modules',
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname + '/src/image'
    }
  },
  // 外部库或 api
  extranls: {
    'jquery': 'window.jQuery'
  },
  devServer: {
    port: 8088,
    inline: true,
    proxy: {
      '**/*.do': {
        target: 'http://test.happymmall.com',
        changeOrigin: true
      }
    }
  }
};

module.exports = config;