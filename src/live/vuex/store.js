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
  lessonInfo: null,
  teacherInfo: null,
  messageInfo: [],
  commentMessageInfo: [],
  recording: false,
  audioPause: false,
  sending: false,
  sendWidth: '0',
  loadingImg: 'static/_static/live/img/loading.gif'
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
  UPDATE_SENDING_WIDTH(state, width){
    state.sendWidth = width;
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
  UPDATE_HISTORY_MESSAGE(state, data){
    if(Array.isArray(data)){
      state.messageInfo = [...data, ...state.messageInfo];
    }else if(Object.prototype.toString.call(data) == '[object Object]'){
      state.messageInfo = [data, ...state.messageInfo];
    }
  },
  //
  UPDATE_COMMENT_MESSAGE(state, data){
    if(Array.isArray(data)){
      state.commentMessageInfo = [...state.commentMessageInfo, ...data];
    }else if(Object.prototype.toString.call(data) == '[object Object]'){
      state.commentMessageInfo = [...state.commentMessageInfo, data];
    }
  },
  //
  UPDATE_HISTORY_COMMENT_MESSAGE(state, data){
    if(Array.isArray(data)){
      state.commentMessageInfo = [...data, ...state.commentMessageInfo];
    }else if(Object.prototype.toString.call(data) == '[object Object]'){
      state.commentMessageInfo = [data, ...state.commentMessageInfo];
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
  UPDATE_LESSONINFO(state, data){
    state.lessonInfo = { ...state.lessonInfo, ...data };
  },
  UPDATE_TEACHERINFO(state, data){
    state.teacherInfo = { ...state.teacherInfo, ...data };
  },
  UPDATE_AVATAR(state, avatar){
    state.loadingImg = avatar;
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
