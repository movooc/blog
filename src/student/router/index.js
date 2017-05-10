/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * component : 路由的组件路径
 */

import App from '../App'

if(process.env.NODE_ENV == 'production'){
  /*home*/
  var home = r => require.ensure([], () => r(require('../views/home/index')), 'student/student-home');
  /*course*/
  var course = r => require.ensure([], () => r(require('../views/course/index')), 'student/student-course');
  var list = r => require.ensure([], () => r(require('../views/course/list')), 'student/student-courseList');
  var detail = r => require.ensure([], () => r(require('../views/course/detail')), 'student/student-courseDetail');
  var brief = r => require.ensure([], () => r(require('../views/course/brief')), 'student/student-courseBrief');
  /*user*/
  var user = r => require.ensure([], () => r(require('../views/user/index')), 'student/student-user');
  var userCenter = r => require.ensure([], () => r(require('../views/user/center')), 'student/student-userCenter');

}else{
  /*home*/
  var home = require('../views/home/index');
  /*course*/
  var course = require('../views/course/index');
  var list = require('../views/course/list');
  var detail = require('../views/course/detail');
  var brief = require('../views/course/brief');
  /*user*/
  var user = require('../views/user/index');
  var userCenter = require('../views/user/center');
}

export default [
  {
    path: '/',
    name: 'index',
    component: home,
    meta: {
      pageTitle: '易课'
    },
    children: [
      {
        path: '',
        redirect: '/course/list'
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
        component: list,
        meta: {
          pageTitle: '易课'
        }
      },
      // 课程详情页
      {
        path: '/course/:lesson_sn',
        name: 'detail',
        component: detail,
        meta: {
          pageTitle: '课程详情'
        },
        children: [
          {
            path: '',
            redirect: '/course/:lesson_sn/brief'
          },
          {
            path: '/course/:lesson_sn/brief',
            name: 'brief',
            component: brief,
            meta: {
              pageTitle: '课程简介'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: user,
    children: [
      // 课程列表页
      {
        path: '',
        name: 'userCenter',
        component: userCenter,
        meta: {
          pageTitle: '个人中心'
        }
      }
    ]
  }
];
