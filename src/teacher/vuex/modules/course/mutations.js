import {
  FETCH_COURSE_LIST,
} from './mutation-type'

import { convertToArray } from '@lib/js/mUtils';

const mutations = {
  // 改变loading状态
  [FETCH_COURSE_LIST](state, data) {
    state.courseList = convertToArray(state.courseList, data);
  },
};
export default mutations;
