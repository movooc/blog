import {
  FETCH_SOME_INFO,
} from './mutation-type'

const mutations = {
  // 改变loading状态
  [FETCH_SOME_INFO](state, info) {
    state.someInfo = info;
  },
};
export default mutations;
