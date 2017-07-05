import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  courseList: [],
  openInfo: null,
  courseDetail: null,
  evaluateList: {},
};

export default{
  state,
  actions,
  getters,
  mutations
}
