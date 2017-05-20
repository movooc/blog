import Vue from 'vue';
import { getCookie } from '@lib/js/mUtils';

export const Vueinterceptors = function () {
  Vue.http.interceptors.push(function(request, next) {
    // add
    console.log('vue.http.headers');
    console.log(Vue.http.headers);
    Vue.http.headers.common['X-SESS'] = getCookie('sess');

    next(function (response) {
      //console.log(response);
    });
  });
};

