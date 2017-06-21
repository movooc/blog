/**
 * Created by zhengguorong on 16/6/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import course from './modules/course'
import handle from './modules/handle'
import data from './modules/data'
import app from './modules/app'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    course,
    handle,
    data,
    app,
  },
  strict: process.env.NODE_ENV !== 'production'
})
