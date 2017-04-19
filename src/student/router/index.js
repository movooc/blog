/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * component : 路由的组件路径
 */

const home = r => require.ensure([], () => r(require('../views/home/index')), 'teacher-home');

export default [{
  path: '/',
  name: 'index',
  component: home,
  children: [
    {
      path: '/hello',
      name: 'hello',
      component: home,
    }]
}];
