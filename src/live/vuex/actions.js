import vue from 'vue';
/**
 * acitons
 */
const _prefix = process.env.NODE_ENV == 'production' ? process.env.LIVE_HOST.replace(/\/$/,'') : '/api';

const _get = ({ url, query }, commit) => {
  //if (commit) commit('UPDATE_LOADING', true);
  let _url;
  if (query) {
    // 是否是对象
    if(Object.prototype.toString.call(query) == '[object Object]'){
      let temp = '';
      for(let q in query){
        temp = `${(temp?temp+'&':temp)}${q}=${query[q]}`;
      }
      //
      query = temp;
    }
    _url = `${url}?${query}`
  } else {
    _url = `${url}`
  }

  return vue.http.get(_url)
    .then((res) => {
      //if (commit) commit('UPDATE_LOADING', false);
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(new Error(res.status))
    })
};

const _post = ({ url, body }, commit) => {
  let _url = url;

  return vue.http.post(_url, body, {emulateJSON:true,withCredentials:true})
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(new Error(res.status))
    })
};

/*获取历史记录*/
export const fetchHistory = ({commit}, query) => {
  const url = `${_prefix}/live-record-tim`;

  return _get({ url, query }, commit)
    .then((json) => {
      if (json.error == 0) {
        return Promise.resolve(json.data);
      }
      return Promise.reject(new Error('Fetch_History failure'))
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};

/*退款*/
export const fetchRefund = ({commit}, body) => {
  const url = `${_prefix}/lesson-refund-freely.api`;

  return _post({ url, body }, commit)
    .then((json) => {
      if (json.error == 0) {
        return Promise.resolve();
      }
      return Promise.reject(json.error);
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};

/*进入课后交流*/
export const fetchStartComment = ({commit}, body) => {
  const url = `${_prefix}/lesson-repose.api`;
  // 开始请求
  commit('UPDATE_LOADING', true);
  return _post({ url, body }, commit)
    .then((json) => {
      commit('UPDATE_LOADING', false);
      if (json.error == 0) {
        return Promise.resolve();
      }
      return Promise.reject(json.error);
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};

/*结束授课*/
export const fetchEndLesson = ({commit}, body) => {
  const url = `${_prefix}/lesson-finish.api`;
  // 开始请求
  commit('UPDATE_LOADING', true);
  return _post({ url, body }, commit)
    .then((json) => {
      commit('UPDATE_LOADING', false);
      if (json.error == 0) {
        return Promise.resolve();
      }
      return Promise.reject(json.error);
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};

/*开始评价*/
export const fetchEvaluate = ({commit}, body) => {
  const url = `${_prefix}/lesson-rating.api`;
  // 开始请求
  commit('UPDATE_LOADING', true);
  return _post({ url, body }, commit)
    .then((json) => {
      commit('UPDATE_LOADING', false);
      if (json.error == 0) {
        commit('UPDATE_EVALUATE_SHOW', false);
        commit('UPDATE_IS_EVALUATE', true);
        return Promise.resolve();
      }
      return Promise.reject(json.error);
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};
