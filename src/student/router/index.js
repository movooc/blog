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
  var notice = r => require.ensure([], () => r(require('../views/course/notice')), 'student/student-courseNotice');
  var evaluate = r => require.ensure([], () => r(require('../views/course/evaluate')), 'student/student-courseEvaluate');
  var evaluateLesson = r => require.ensure([], () => r(require('../views/course/evaluate-lesson')), 'student/student-courseEvaluateLesson');
  /*user*/
  var user = r => require.ensure([], () => r(require('../views/user/index')), 'student/student-user');
  var userCenter = r => require.ensure([], () => r(require('../views/user/center')), 'student/student-userCenter');
  var guarantee = r => require.ensure([], () => r(require('../views/user/guarantee')), 'student/student-guarantee');
  var enrolled = r => require.ensure([], () => r(require('../views/user/enroll')), 'student/student-userEnroll');
  var advise = r => require.ensure([], () => r(require('../views/user/advise')), 'student/student-userAdvise');
  /*refund*/
  var refund = r => require.ensure([], () => r(require('../views/refund/index')), 'student/student-courseNotice');
  var reason = r => require.ensure([], () => r(require('../views/refund/reason')), 'student/student-courseReason');

}else{
  /*home*/
  var home = require('../views/home/index');
  /*course*/
  var course = require('../views/course/index');
  var list = require('../views/course/list');
  var detail = require('../views/course/detail');
  var brief = require('../views/course/brief');
  var notice = require('../views/course/notice');
  var evaluate = require('../views/course/evaluate');
  var evaluateLesson = require('../views/course/evaluate-lesson');
  /*user*/
  var user = require('../views/user/index');
  var userCenter = require('../views/user/center');
  var guarantee = require('../views/user/guarantee');
  var enrolled = require('../views/user/enroll');
  var advise = require('../views/user/advise');
  /*refund*/
  var refund = require('../views/refund/index');
  var reason = require('../views/refund/reason');
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
          pageTitle: '易课-课程列表'
        }
      },
      // 课程详情页
      {
        path: '/course/detail',
        name: 'detail',
        component: detail,
        meta: {
          pageTitle: '易课-课程详情'
        },
        children: [
          {
            path: '',
            redirect: '/course/detail/brief'
          },
          {
            path: '/course/detail/brief',
            name: 'brief',
            component: brief,
            meta: {
              pageTitle: '易课-课程简介'
            }
          },
          {
            path: '/course/detail/notice',
            name: 'notice',
            component: notice,
            meta: {
              pageTitle: '易课-课程须知'
            }
          },
          {
            path: '/course/detail/evaluate',
            name: 'evaluate',
            component: evaluate,
            meta: {
              pageTitle: '易课-课程评价'
            }
          }
        ]
      },
      // 评价某课程
      {
        path: '/course/evaluate/:lesson_sn',
        name: 'evaluate-lesson',
        component: evaluateLesson,
        meta: {
          pageTitle: '易课-评价课程'
        }
      },
      // 退款
      {
        path: '/course/refund',
        name: 'refund',
        component: refund,
        meta: {
          pageTitle: '易课-申请退款'
        }
      },
      // 退款理由
      {
        path: '/course/reason',
        name: 'reason',
        component: reason,
        meta: {
          pageTitle: '易课-处理结果'
        }
      },
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
          pageTitle: '易课-个人中心'
        }
      },
      // 已报名的课程
      {
        path: '/user/enrolled',
        name: 'enrolled',
        component: enrolled,
        meta: {
          pageTitle: '易课-已报名的课程'
        }
      },
      // 课程保障页
      {
        path: '/user/guarantee',
        name: 'guarantee',
        component: guarantee,
        meta: {
          pageTitle: '易课-课程保障'
        }
      },
      // 建议与反馈
      {
        path: '/user/advise',
        name: 'advise',
        component: advise,
        meta: {
          pageTitle: '易课-建议与反馈'
        }
      }
    ]
  }
];
