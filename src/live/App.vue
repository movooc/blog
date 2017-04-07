<template>
  <div>
    <v-header></v-header>
    <v-loading :show="loadingShow"></v-loading>
    <img src="./assets/img/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
  import vHeader from '@live/components/header/index.vue';
  import vLoading from '@live/components/loading/index.vue';
  import { mapState } from 'vuex';

  export default {
    name: 'app',
    components: {
      vHeader,
      vLoading,
    },
    computed: {
      ...mapState([
        'loadingShow'
      ])
    },
    methods: {

    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  #app
    font-family: Microsoft YaHei, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    max-width: 750px;
    margin: 0 auto;
    color: #3C4A55;

    .show
      transform: translateX(250px);
    .page-cover
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 7;
    .first
      position: fixed;
      top: 0px;
      z-index: 20;
      width: 100%;
      height: 100%;
      background: #FF0000;

</style>
