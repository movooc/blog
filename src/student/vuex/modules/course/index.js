import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  courseList: [],
  enroll: {},
  order: null,
  openInfo: null,
  courseDetail: null,
};

export default{
  state,
  actions,
  getters,
  mutations
}
