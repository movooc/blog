import vue from 'vue';

/**
 * get请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */
const _prefix = process.env.NODE_ENV == 'production' ? process.env.TEACHER_HOST.replace(/\/$/,'') : '/api';

const _get = ({ url, query }, commit) => {
  if (commit) commit('START_LOADING');
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
      if (commit) commit('FINISH_LOADING');
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(new Error(res.status))
    })
};

const _post = ({ url, body }, commit) => {
  if (commit) commit('START_LOADING');
  let _url = url;

  return vue.http.post(_url, body, {emulateJSON:true})
    .then((res) => {
      if (commit) commit('FINISH_LOADING');
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(new Error(res.status))
    })
};

export const fetchCourseList = ({commit}, query) => {
  const url = `${_prefix}/lesson-list.api`;

  return _get({ url, query }, commit)
    .then((json) => {
      if (json.error == 0) {
        return commit('FETCH_COURSE_LIST', json.data)
      }
      return Promise.reject(new Error('Fetch_Course_List failure'))
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};

export const fetchCourseDetail = ({commit}, query) => {
  const url = `${_prefix}/lesson-detail.api`;

  return _get({ url, query }, commit)
    .then((json) => {
      if (json.error == 0) {
        commit('FETCH_COURSE_DETAIL', json.data)
        return Promise.resolve(json.data)
      }
      return Promise.reject(new Error('Fetch_Course_List failure'))
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};

export const fetchOpenInfo = ({commit}, body) => {
  const url = `${_prefix}/lesson-open.api`;

  return _post({ url, body }, commit)
    .then((json) => {
      if (json.error == 0) {
        // return commit('FETCH_OPEN_INFO', json.data)
        return Promise.resolve(json.data);
      }
      return Promise.reject(new Error('Fetch_Open_Info failure'))
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};
