<template>
  <div class="app">
    <!--<v-header></v-header>-->
    <!--<nav-bar></nav-bar>-->
    <div class="loading" v-show="loading"></div>
    <div>
      <router-view></router-view>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import NavBar from './components/navbar'
import VHeader from './components/header'
import VFooter from './components/footer'
import { setCookie } from '@lib/js/mUtils';
import { mapGetters } from 'vuex'

export default {
  components: {
    NavBar,
    VHeader,
    VFooter
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
    loading: 'getLoading',
  })
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  body
    margin: 0;
    background: #f2f4f7;
    font-family: "Microsoft YaHei","微软雅黑";
  .clearfix:after
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  .pull-left {
    float: left;
  }
  .pull-right {
    float: right;
  }
</style>
