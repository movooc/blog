import {
  FETCH_USER_INFO,
  START_LOADING,
  FINISH_LOADING
} from './mutation-type'

const mutations = {
  // 切换左侧导航的显示状态
  [FETCH_USER_INFO](state, data) {
    state.userInfo = { ...data }
  },
  [START_LOADING](state) {
    state.loading = true
  },
  [FINISH_LOADING](state) {
    state.loading = false
  }
};

export default mutations
