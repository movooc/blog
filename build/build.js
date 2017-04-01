require('./check-versions')();

process.env.NODE_ENV = 'production';

var ora = require('ora');
var fs = require('fs');
var fsExtra = require('fs-extra');
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
      '  Tip: Waiting for recombinating the files...\n'+
      '  Ready...\n'
    ));

    Recombination();
  })
})

// recombination dist files
function Recombination() {
  // get all files in dist
  var distPath = path.resolve(__dirname, '../dist')
  var htmlPath = fs.readdirSync(distPath);
  var outStaticPath = distPath + '/static';
  // create dir
  fs.mkdirSync(distPath+'/'+pckVersion, 0755);

  // 根据filename创建文件
  for(let _html of htmlPath){
    if(/\.html$/.test(_html)){
      var fileName = _html.replace(/\.html$/,'');
      var dirPath = distPath+'/'+pckVersion;
      var filePath = dirPath+'/'+fileName;
      var staticPath = filePath+'/static';
      // create dir
      if(!fs.existsSync(filePath))fs.mkdirSync(filePath, 0755);
      // create static dir
      if(!fs.existsSync(staticPath))fs.mkdirSync(staticPath, 0755);
      // move the html files
      fs.renameSync(distPath+'/'+_html, filePath+'/'+_html);
      // search static files
      var staticFile = fs.readdirSync(outStaticPath);
      // check if file
      for(let _static of staticFile){
        //
        if(/\.\w+$/.test(_static) && new RegExp(fileName).test(_static)){
          // move files
          fs.renameSync(outStaticPath+'/'+_static, staticPath+'/'+_static);
        }else if(!(/\.\w+$/.test(_static))){
          let from = outStaticPath+'/'+_static;
          let to = staticPath+'/'+_static;
          // search static files
          let fromFile = fs.readdirSync(from);
          // create dir
          if(!fs.existsSync(to))fs.mkdirSync(to, 0755);
          //
          for(let file of fromFile){
            if(/\.\w+$/.test(file) && new RegExp(fileName).test(from)){
              // move files
              fs.renameSync(from+'/'+file, to+'/'+file);
            }else if(new RegExp(fileName).test(file)){
              Rename(from+'/'+file, to+'/'+file, fileName);
            }
          }
        }
      }
      // end modules
      console.log(`  compile ${fileName} modules success!!!\n`);
    }
  };
  // completes all files
  console.log(`  compile all modules success!!!\n`);
  // unlink outstatic files
  console.log(`  start delete out static files...\n`);
  // start removing
  fsExtra.remove(outStaticPath, function (err) {
    if(err)return console.log(err);
    console.log('  delete success!!!');
  });
}

function Rename(from, to, fileName){
  // search static files
  var fromFile = fs.readdirSync(from);
  // create dir
  if(!fs.existsSync(to))fs.mkdirSync(to, 0755);
  //
  for(let file of fromFile){
    if(/\.\w+$/.test(file)){
      // move files
      fs.renameSync(from+'/'+file, to+'/'+file);
    }else{
      Rename(from+'/'+file, to+'/'+file);
    }
  }
}
