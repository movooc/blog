import {
  CHANGE_LOADING_STATE,
} from './mutation-type'

const mutations = {
  // 改变loading状态
  [CHANGE_LOADING_STATE](state, isShow) {
    state.loading = isShow;
  },
};
export default mutations
