/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * component : 路由的组件路径
 */

import App from '../App'

if(process.env.NODE_ENV == 'production'){
  //
  var home = r => require.ensure([], () => r(require('../views/home/index')), 'teacher/teacher-home');
  var course = r => require.ensure([], () => r(require('../views/course/index')), 'teacher/teacher-course');
  var list = r => require.ensure([], () => r(require('../views/course/list')), 'teacher/teacher-courseList');
  var detail = r => require.ensure([], () => r(require('../views/course/detail')), 'teacher/teacher-courseDetail');
  var create = r => require.ensure([], () => r(require('../views/course/create')), 'teacher/teacher-courseCreate');

}else{
  //
  var home = require('../views/home/index');
  var course = require('../views/course/index');
  var list = require('../views/course/list');
  var detail = require('../views/course/detail');
  var create = require('../views/course/create');
}

export default [
  {
    path: '/',
    name: 'index',
    component: home,
    children: [
      {
        path: '',
        redirect: '/course'
      }
    ]
  },
  {
    path: '/course',
    name: 'course',
    component: course,
    children: [
      {
        path: '',
        redirect: '/course/list'
      },
      // 课程列表页
      {
        path: '/course/list',
        name: 'list',
        component: list
      },
      // 课程详情页
      {
        path: '/course/:lesson_sn/detail',
        name: 'detail',
        component: detail
      },
      // 创建课程
      {
        path: '/course/create',
        name: 'create',
        component: create
      },
      // 编辑课程
      {
        path: '/course/edit/:lesson_sn',
        name: 'edit',
        component: create
      }
    ]
  }
];
