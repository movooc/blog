/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * component : 路由的组件路径
 */

import App from '../App'

const home = r => require.ensure([], () => r(require('../views/home/index')), 'teacher/teacher-home');
const course = r => require.ensure([], () => r(require('../views/course/index')), 'teacher/teacher-course');
const list = r => require.ensure([], () => r(require('../views/course/list')), 'teacher/teacher-courseList');
const detail = r => require.ensure([], () => r(require('../views/course/detail')), 'teacher/teacher-courseDetail');

export default [
  {
    path: '/',
    name: 'index',
    component: home
  },
  {
    path: '/course',
    name: 'course',
    component: course,
    children: [
      // 课程列表页
      {
        path: '/course/list',
        name: 'list',
        component: list
      },
      // 课程详情页
      {
        path: '/course/:lesson_sn',
        name: 'detail',
        component: detail
      }
    ]
  }
];
