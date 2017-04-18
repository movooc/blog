<template>
  <div class="app" :class="{'is-header':isHeader,'is-pc':isPC}">
    <v-header v-if="isWeiXin"></v-header>
    <v-loading :show="loadingShow"></v-loading>
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
        'loadingShow',
        'isHeader'
      ])
    },
    data() {
      return {
        isPC,
        isWeiXin,
      };
    },
    methods: {
    }
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
    &.is-header
      padding-top: 100px;
    &.is-pc
      max-width: 1600px;
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
