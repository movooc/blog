<template>
  <div class="app">
    <v-header></v-header>
    <div class="container mt20 clearfix">
      <sider-bar></sider-bar>
      <div class="box">
        <v-notice></v-notice>
        <router-view></router-view>
      </div>
      <div class="loading" v-show="loading"></div>
    </div>
  </div>
</template>

<script>
import SiderBar from './components/siderbar'
import VHeader from './components/header'
import VNotice from './components/notice'
import { setCookie } from '@lib/js/mUtils';
import { mapGetters } from 'vuex'

export default {
  components: {
    SiderBar,
    VHeader,
    VNotice
  },
  created() {
    // 获取用户信息
    this.$store.dispatch('fetchUserInfo').then((data) => {
      console.log('success');
    }, (err) => {
      alert(err.message);
    });
  },
  computed: mapGetters({
    loading: 'getLoading'
  })
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  body
    margin: 0;
    background: #EFEFF4;
  .container
    margin: 0 auto;
    width: 1200px;
  .clearfix:after
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  .box
    float:right;
    width: 900px;
  .mt20
    margin-top: 20px;
</style>
