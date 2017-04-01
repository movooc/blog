var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: false
    }),
    new FriendlyErrorsPlugin()
  ]
});

// https://github.com/ampedandwired/html-webpack-plugin
var pages = utils.getEntries('./view/**/*.html');

for (var page in pages) {
  // 配置html文件
  var _config = {
    filename: page+'.html',
    template: pages[page], // 模板路径
    inject: true,
    excludeChunks: Object.keys(pages).filter(item => {
      return (item != page)
    })
  };
  // 需要配置后生成的html
  webpackConfig.plugins.push(new HtmlWebpackPlugin(_config))
}


module.exports = webpackConfig;
