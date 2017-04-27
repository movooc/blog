// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var publicPath = process.env.ASSETS_HOST ? process.env.ASSETS_HOST : '/';

module.exports = {
  build: {
    env: require('./prod.env'),
    index: '',
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: publicPath,
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8686,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api':{
        //target: 'http://teacher.sandbox.yike.fm',
        target: 'http://sandbox.yike.fm',
        //target: 'http://student.sandbox.yike.fm',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api':''
        },
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('X-SESS', '58f9ebeea1419-10590155e917d9b9.12021099');
          let ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 wechatdevtools/0.7.0 MicroMessenger/6.3.9 Language/zh_CN webview/0'
          proxyReq.setHeader('User-Agent', ua);
          // console.log(proxyReq.getHeader('user-agent'));
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
