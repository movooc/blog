import {
  FETCH_COURSE_LIST,
  FETCH_COURSE_DETAIL,
} from './mutation-type'

import { convertToArray } from '@lib/js/mUtils';

const mutations = {
  // 改变列表
  [FETCH_COURSE_LIST](state, data) {
    state.courseList = convertToArray(state.courseList, data);
  },
  // 改变详情
  [FETCH_COURSE_DETAIL](state, data) {
    state.courseDetail = { ...state.courseDetail, data };
  },
};
export default mutations;
