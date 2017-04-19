import {
  GET_HOME_INFO,
} from './mutation-type'

const mutations = {
  // 改变loading状态
  [GET_HOME_INFO](state, info) {
    state.loading = info;
  },
};
export default mutations
