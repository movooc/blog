<template>
  <div class="app">
    <nav-bar></nav-bar>
    <div class="loading"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  import NavBar from '@student/components/navbar.vue'
  import { mapState } from 'vuex';

  export default {
    name: 'app',
    components: {
      NavBar,
    },
    computed: {
      ...mapState({
        loading: 'getLoading',
      })
    },
    mounted() {
      setTimeout(() => {
        this.$store.dispatch('changeLoadingState', false)
      }, 2000);
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  html, body
    margin: 0;
    height: 100%;
    overflow-y: hidden;
  .app
    font-family: Microsoft YaHei, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    margin: 0 auto;
    color: #3C4A55;
</style>
