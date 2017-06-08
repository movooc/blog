import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  courseList: [],
  evaluateList: [],
  enroll: {},
  order: null,
  openInfo: null,
  courseDetail: null,
  courseScrollTop: 0,
};

export default{
  state,
  actions,
  getters,
  mutations
}
