import Vue from 'vue';
import { getCookie } from '@lib/js/mUtils';

export const Vueinterceptors = function () {
  Vue.http.interceptors.push(function(request, next) {
    // add
    Vue.http.headers.common['X-SESS'] = getCookie('sess');

    next(function (response) {
      //console.log(response);
    });
  });
};

