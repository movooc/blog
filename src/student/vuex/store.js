/**
 * Created by me on 17/4/19.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import app from './modules/app';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    app,
  },
  strict: process.env.NODE_ENV !== 'production'
})
