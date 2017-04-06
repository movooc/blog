// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import store from './vuex/store';
import routes from './router';
import FastClick from 'fastclick';
import '@lib/js/rem';
import 'normalize.css';

/*
 * fastclick
 */
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

/* register */
Vue.use(VueRouter);

/* bind router */
const router = new VueRouter({
  'linkActiveClass': 'active',
  routes
});

/* el app */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
