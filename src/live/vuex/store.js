/**
 * store
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';

/* register middleware */
Vue.use(Vuex);

/* init state */
const state = {
  headerTitle: '直播',
  loadShow: true,
  menuShow: false,
  isOwner : false,
  commentShow: false,
  isHeader: true,
  userInfo: null,
  teacherInfo: null,
  messageInfo: [],
  recording: false,
  sending: false,
};

/* mutations serials */
const mutations = {
  // update title
  UPDATE_TITLE(state, title){
    state.headerTitle = title;
  },
  //
  UPDATE_LOADING(state, show){
    state.loadShow = show;
  },
  UPDATE_RECORDING(state, show){
    state.recording = show;
  },
  UPDATE_SENDING(state, show){
    state.sending = show;
  },
  //
  UPDATE_MESSAGE(state, data){
    if(Array.isArray(data)){
      state.messageInfo = [...state.messageInfo, ...data];
    }else if(Object.prototype.toString.call(data) == '[object Object]'){
      state.messageInfo = [...state.messageInfo, data];
    }
  },
  //
  UPDATE_MENUSHOW(state, data){
    state.menuShow = data;
  },
  // update comment show
  UPDATE_COMMETN_SHOW(state, show){
    state.commentShow = show;
  },
  // 是否是管理员
  UPDATE_ISOWNER(state, isOwner){
    state.isOwner = isOwner;
  },
  UPDATE_USERINFO(state, data){
    state.userInfo = { ...state.userInfo, ...data };
  },
};

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
