import {
  GET_COURSE_LIST,
} from './mutation-type'

const mutations = {
  // 改变loading状态
  [GET_COURSE_LIST](state, data) {
    state.courseList = data;
  },
};
export default mutations;
