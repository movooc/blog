import {
  FETCH_ENROLL_LIST,
} from './mutation-type'

const mutations = {
  // 改变loading状态
  [FETCH_ENROLL_LIST](state, data) {
    if(Array.isArray(data)){
      state.enrollList = [...data, ...state.enrollList];
    }else if(Object.prototype.toString.call(data) == '[object Object]'){
      state.enrollList = [data, ...state.enrollList];
    }
  },
};
export default mutations;
