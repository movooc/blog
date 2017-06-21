import Vue from 'vue';
import moment from 'moment';

// 切换成中文版本
moment.locale('zh-cn');

export const Vueinterceptors = function () {
  Vue.http.interceptors.push(function(request, next) {
    // add
    //Vue.http.headers.custom['X-SESS'] = '58f5e18810316-558fb1392c18318.26237119';
    next(function (response) {
      //console.log(response);
    });
  });
};

// filter moment
export const VueFilterMoment = function () {
  Vue.filter('moment', function (value) {
    //
    let dateArr = value.split('#');
    if(dateArr.length < 2){
      return moment(dateArr[0]).startOf('minutes').fromNow();
    }else{
      return moment(dateArr[1]).startOf('minutes').from(dateArr[0]);
    }
  })
};

// filter moment
export const VueFilterSpecKey = function () {
  Vue.filter('specKey', function (data, param) {
    //
    let value = 0;
    try{
      value = data[param];
    }catch(e){}
    return (value || 0);
  })
};
