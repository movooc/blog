<template>
  <div class="app">
    <v-header></v-header>
    <nav-bar></nav-bar>
    <div class="loading" v-show="loading"></div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './components/navbar'
import VHeader from './components/header'
import { setCookie } from '@lib/js/mUtils';
import { mapGetters } from 'vuex'

export default {
  components: {
    NavBar,
    VHeader
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

</style>
