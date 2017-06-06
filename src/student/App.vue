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
    // 请求配置接口
    if(wx){
      this.$store.dispatch('fetchWXConfig', {url:encodeURIComponent(window.location.href)}).then((result)=>{
        // 微信操作
        wx.config({
          debug: false,
          appId: result.appId,
          timestamp: result.timestamp,
          nonceStr: result.nonceStr,
          signature: result.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        });
      });
    }
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
    font-family: "Microsoft YaHei","WenQuanYi Micro Hei","微软雅黑";
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
