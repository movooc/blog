import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@teacher/components/Hello';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/teacher',
      name: 'Hello',
      component: Hello,
    },
  ],
});
