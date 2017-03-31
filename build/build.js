require('./check-versions')();

process.env.NODE_ENV = 'production';

var ora = require('ora');
var fs = require('fs');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var pckVersion = require('../package.json').version;
var config = require('../config');
var webpackConfig = require('./webpack.prod.conf');

var spinner = ora('building for production...');
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: Waiting for recombinating the files...\n'
    ));

    Recombination();
  })
})

// recombination dist files
function Recombination() {
  // get all files in dist
  var distPath = path.resolve(__dirname, '../dist')
  var htmlPath = fs.readdirSync(distPath);
  // create dir
  fs.mkdir(distPath+'/'+pckVersion, 0755);
  for(var _html in htmlPath){
    


  };

  // 移动html

  console.log(htmlPath);
}
