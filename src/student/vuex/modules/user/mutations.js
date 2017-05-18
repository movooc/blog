import {
  FETCH_ENROLL_LIST,
} from './mutation-type'

const mutations = {
  // 改变loading状态
  [FETCH_ENROLL_LIST](state, data) {
    state.enrollList = [ ...data ];
  },
};
export default mutations;
