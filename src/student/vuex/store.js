/**
 * Created by zhengguorong on 16/6/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import course from './modules/course'
import user from './modules/user'
import refund from './modules/refund'
import app from './modules/app'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    user,
    course,
    refund,
    app,
  },
  strict: process.env.NODE_ENV !== 'production'
})
