// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import vueResource from 'vue-resource';
import FastClick from 'fastclick';
import App from './App';
import store from './vuex/store';
import routes from './router';
import { Vueinterceptors, VueFilterMoment } from '@student/assets/js/middleware';
import SetWechatTitle from '@lib/js/setWechatTitle';
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
Vue.use(VueRouter);
Vue.use(vueResource);
/* set vue interceptors */
Vueinterceptors();
/* set vue moment */
VueFilterMoment();

/* bind router */
const router = new VueRouter({
  'linkActiveClass': 'active',
  //mode:'history',
  routes,
});

/* change title */
router.afterEach((transition) => {
  let title = transition.meta.pageTitle;
  SetWechatTitle(title);
});

/* el app */
new Vue({
  router,
  store,
  template: '<App/>',
  components: { App },
}).$mount('#app');
