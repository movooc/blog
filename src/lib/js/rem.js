(function () {
    var dpr, rem, scale;
    var docEl = document.documentElement;
    var fontEl = document.createElement('style');
    var overEl = document.createElement('style');
    var metaEl = document.querySelector('meta[name="viewport"]');

    // 判断是否是PC设备
    //平台、设备和操作系统
    var isPC = false;
    var isWeiXin = true;
    var p = navigator.platform;
    var mySystem = {
      win  : p.indexOf("Win") == 0,
      mac  : p.indexOf("Mac") == 0,
      wx   : (navigator.userAgent.toLocaleLowerCase().match(/MicroMessenger/i) == 'micromessenger')?true:false,
      ipad : (navigator.userAgent.match(/iPad/i) != null)?true:false
    };

    //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
    if (mySystem.win || mySystem.mac || mySystem.xll || mySystem.ipad) {
      isPC = true;
    }

    // weixin
    isWeiXin = mySystem.wx;

    dpr = window.devicePixelRatio || 1;
    rem = isPC ? 75 : docEl.clientWidth * dpr / 10;
    scale = 1 / dpr;
    //alert(dpr)

    if(!isPC) {

      // 设置viewport，进行缩放，达到高清效果
      metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

      // 设置data-dpr属性，留作的css hack之用
      docEl.setAttribute('data-dpr', dpr);
    }else{
      // 设置成pc属性
      overEl.innerHTML = 'body{overflow-y: auto;}';
      docEl.firstElementChild.appendChild(overEl);
    }

    fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

    // 动态写入样式
    docEl.firstElementChild.appendChild(fontEl);

    // 给js调用的，某一dpr下rem和px之间的转换函数
    window.rem2px = function(v) {
        v = parseFloat(v);
        return v * rem;
    };
    window.px2rem = function(v) {
        v = parseFloat(v);
        return v / rem;
    };
    window.__scale = scale;

    window.dpr  = dpr;
    window.rem  = rem;
    window.isPC = isPC;
    window.isWeiXin = isWeiXin;
})();
