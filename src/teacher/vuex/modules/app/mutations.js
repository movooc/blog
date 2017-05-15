import {
  CHANGE_IS_NOTICE,
  FETCH_USER_INFO,
  START_LOADING,
  FINISH_LOADING
} from './mutation-type'

const mutations = {
  // 获取用户信息状态
  [FETCH_USER_INFO](state, data) {
    state.userInfo = { ...data }
  },
  [CHANGE_IS_NOTICE](state, isNotice) {
    state.isNotice = isNotice
  },
  [START_LOADING](state) {
    state.loading = true
  },
  [FINISH_LOADING](state) {
    state.loading = false
  }
};

export default mutations
