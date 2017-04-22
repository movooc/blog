import Vue from 'vue';

export const Vueinterceptors = function () {
  Vue.http.interceptors.push(function(request, next) {
    // add
    Vue.http.headers.custom['X-SESS'] = '58f5e18810316-558fb1392c18318.26237119';
    next(function (response) {
      //console.log(response);
    });
  });
};
