import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@live/components/Hello';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/live',
      name: 'Hello',
      component: Hello,
    },
  ],
});
