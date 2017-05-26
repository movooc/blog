import {
  FETCH_COURSE_LIST,
  FETCH_COURSE_DETAIL,
  FETCH_OPEN_INFO,
  FETCH_LESSON_ENROLL,
  FETCH_ORDER_CONFIRM,
  UPDATE_COURSE_SCROLL,
} from './mutation-type'

import { convertToArray } from '@lib/js/mUtils';

const mutations = {
  // 改变列表
  [FETCH_COURSE_LIST](state, data) {
    state.courseList = convertToArray(state.courseList, data);
  },
  // 改变详情
  [FETCH_COURSE_DETAIL](state, data) {
    state.courseDetail = { ...state.courseDetail, ...data };
  },
  // 获得开课信息
  [FETCH_OPEN_INFO](state, data) {
    state.openInfo = { ...state.openInfo, data };
  },
  // 获得报名信息
  [FETCH_LESSON_ENROLL](state, data) {
    state.enroll = { ...state.enroll, ...data };
  },
  // 获得订单信息
  [FETCH_ORDER_CONFIRM](state, data) {
    state.order = { ...state.order, ...data };
  },
  // 改变滚度条位置
  [UPDATE_COURSE_SCROLL](state, top) {
    state.courseScrollTop = top;
  },
};
export default mutations;
