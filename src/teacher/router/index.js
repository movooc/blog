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
  var share = r => require.ensure([], () => r(require('../views/course/share')), 'teacher/teacher-courseShare');
  /*处理中心*/
  var handle = r => require.ensure([], () => r(require('../views/handle/index')), 'teacher/teacher-handle');
  var handleHas = r => require.ensure([], () => r(require('../views/handle/handle-has')), 'teacher/teacher-handleHas');
  var handleWill = r => require.ensure([], () => r(require('../views/handle/handle-will')), 'teacher/teacher-handleWill');
  var handleList = r => require.ensure([], () => r(require('../views/handle/list')), 'teacher/teacher-handleList');
  /*数据中心*/
  var data = r => require.ensure([], () => r(require('../views/data/index')), 'teacher/teacher-data');
  var dataCourse = r => require.ensure([], () => r(require('../views/data/course')), 'teacher/teacher-dataCourse');
  var dataOrigin = r => require.ensure([], () => r(require('../views/data/origin')), 'teacher/teacher-dataOrigin');
  /*我的收益*/
  var earning = r => require.ensure([], () => r(require('../views/earning/index')), 'teacher/teacher-earning');
  var earningList = r => require.ensure([], () => r(require('../views/earning/list')), 'teacher/teacher-earningList');

}else{
  //
  var home = require('../views/home/index');
  var course = require('../views/course/index');
  var list = require('../views/course/list');
  var detail = require('../views/course/detail');
  var create = require('../views/course/create');
  var share = require('../views/course/share');
  /*处理中心*/
  var handle = require('../views/handle/index');
  var handleHas = require('../views/handle/handle-has');
  var handleWill = require('../views/handle/handle-will');
  var handleList = require('../views/handle/list');
  /*数据中心*/
  var data = require('../views/data/index');
  var dataCourse = require('../views/data/course');
  var dataOrigin = require('../views/data/origin');
  /*我的收益*/
  var earning = require('../views/earning/index');
  var earningList = require('../views/earning/list');
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
      {
        path: '/course/:lesson_sn/detail',
        redirect: '/course/:lesson_sn/detail/1'
      },
      // 课程列表页
      {
        path: '/course/list',
        name: 'list',
        component: list,
        meta: {
          pageTitle: '易灵微课-课程列表'
        }
      },
      // 课程详情页
      {
        path: '/course/:lesson_sn/detail/:page',
        name: 'detail',
        component: detail,
        meta: {
          pageTitle: '易灵微课-课程详情'
        }
      },
      // 创建课程
      {
        path: '/course/create',
        name: 'create',
        component: create,
        meta: {
          pageTitle: '易灵微课-课程创建'
        }
      },
      // 编辑课程
      {
        path: '/course/edit/:lesson_sn',
        name: 'edit',
        component: create,
        meta: {
          pageTitle: '易灵微课-课程编辑'
        }
      },
      // 分享课程
      {
        path: '/course/share/:lesson_sn',
        name: 'share',
        component: share,
        meta: {
          pageTitle: '易灵微课-课程分享'
        }
      }
    ]
  },
  {
    path: '/handle',
    name: 'index',
    component: handle,
    children: [
      {
        path: '',
        redirect: '/handle/will'
      },
      // 已处理列表
      {
        path: '/handle/has',
        name: 'handle-has',
        component: handleHas,
        meta: {
          pageTitle: '易灵微课-处理中心'
        },
        children: [
          {
            path: '',
            redirect: '/handle/has/1'
          },
          {
            path: '/handle/has/:page',
            name: 'handle-has-list',
            component: handleList,
            meta: {
              pageTitle: '易灵微课-处理中心'
            }
          },
        ]
      },
      // 未处理列表
      {
        path: '/handle/will',
        name: 'handle-will',
        component: handleWill,
        meta: {
          pageTitle: '易灵微课-处理中心'
        },
        children: [
          {
            path: '',
            redirect: '/handle/will/1'
          },
          {
            path: '/handle/will/:page',
            name: 'handle-will-list',
            component: handleList,
            meta: {
              pageTitle: '易灵微课-处理中心'
            }
          },
        ]
      },
    ]
  },
  {
    path: '/data',
    name: 'data',
    component: data,
    children: [
      {
        path: '',
        redirect: '/data/course'
      },
      // 数据中心
      {
        path: '/data/course',
        name: 'data-course',
        component: dataCourse,
        meta: {
          pageTitle: '易灵微课-数据中心'
        }
      },
      // 数据来源首页
      {
        path: '/data/origin/:lesson_sn/:origin_id',
        name: 'data-origin',
        component: dataOrigin,
        meta: {
          pageTitle: '易灵微课-数据中心'
        }
      },
    ]
  },
  {
    path: '/earning',
    name: 'earning',
    component: earning,
    children: [
      {
        path: '',
        redirect: '/earning/list'
      },
      // 数据中心
      {
        path: '/earning/list',
        name: 'earning-list',
        component: earningList,
        meta: {
          pageTitle: '易灵微课-我的收益'
        },
        children: [
          {
            path: '',
            redirect: '/earning/list/1',
          },
          {
            path: '/earning/list/:page',
            name: 'earning-list',
            component: earningList,
            meta: {
              pageTitle: '易灵微课-我的收益'
            }
          },
        ]
      },
    ],
  },
];
