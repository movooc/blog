<template>
  <div class="app">
    <v-header></v-header>
    <div class="container mt20 clearfix">
      <sider-bar></sider-bar>
      <div class="box">
        <v-notice v-if="isNotice"></v-notice>
        <router-view></router-view>
      </div>
      <div class="loading" v-show="loading">
        <div class="loader-inner ball-pulse">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
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
    loading: 'getLoading',
    isNotice: 'getIsNotice',
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
  .pull-left {
    float: left;
  }
  .pull-right {
    float: right;
  }
  .loading
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index 30
    width: 100%
    height: 100%;
    background-color: #ffffff
    opacity: 0.7
    .ball-pulse
      position: absolute
      top: 50%
      left: 45%
      div
        background-color: #03a9f4;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        margin: 2px;
        animation-fill-mode: both;
        display: inline-block;
      div:nth-child(1)
        animation: scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
      div:nth-child(2)
        animation: scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
      div:nth-child(3)
        animation: scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)


    @-webkit-keyframes scale {
      0% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1; }
      45% {
        -webkit-transform: scale(0.1);
        transform: scale(0.1);
        opacity: 0.7; }
      80% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1; } }
    @keyframes scale {
      0% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1; }
      45% {
        -webkit-transform: scale(0.1);
        transform: scale(0.1);
        opacity: 0.7; }
      80% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1; } }
  button{
    outline:none;
  }
</style>
