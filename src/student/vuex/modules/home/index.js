import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  homeInfo: {
    msg: '欢迎您!'
  }
};

export default{
  state,
  actions,
  getters,
  mutations
}
