/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * component : 路由的组件路径
 */

const home = r => require.ensure([], () => r(require('../views/home/index')), 'teacher-home');

// export default [{
//   path: '/',
//   component: App, //顶层路由，对应index.html
//   children: [ //二级路由。对应App.vue
//     //地址为空时跳转home页面
//     {
//       path: '',
//       redirect: '/home'
//     },
//     //首页
//     {
//       path: '/home',
//       component: home
//     }
//   ]
// }];

// require.ensure 是 Webpack 的特殊语法，用来设置 组件到底路径
/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * name ： 路由的名字
 * component : 路由的组件路径
 */
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
