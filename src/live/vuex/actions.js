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

/*获取历史记录*/
export const fetchHistory = ({commit}, query) => {
  const url = `${_prefix}/live-history-tim`;

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
