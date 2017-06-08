// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import vueResource from 'vue-resource';
import FastClick from 'fastclick';
import App from './App';
import store from './vuex/store';
import routes from './router';
// import { Vueinterceptors } from '@live/assets/js/middleware';
import '@lib/js/rem';
import '@lib/css/font.styl';
import 'normalize.css';

/*
 * fastclick
 */
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

/* register compoent */
// Vue.use(infiniteScroll);
Vue.use(VueRouter);
Vue.use(vueResource);
/* set vue interceptors */
// Vueinterceptors();

/* bind router */
const router = new VueRouter({
  'linkActiveClass': 'active',
  //mode:'history',
  routes,
});

/* el app */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
