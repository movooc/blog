<template>
  <!-- live header -->
  <div class="live-header">
    <span class="title">听课指南</span>
    <ul class="header-notice">
      <li>可展开讨论区与其他学员交流</li>
      <li>语音正在播放时，点击&nbsp;<i class="iconfont icon-laba"></i> 可定位到播放位置</li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default
  {
    name: 'l-header',
    components: {
    },
    data() {
      return {
        show: false
      };
    },
    computed: {
    },
    methods: {
      isShow() {
        this.$store.commit('UPDATE_MENUSHOW');
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";

  .header-notice
    .icon-laba
      padding: 5px;
      color: #fff;
      background: #12b7f5;
      border-radius: 50%;
      -webkit-border-radius: 50%;
      px2px(font-size, 32px);
  .is-pc
    .header-notice
      .icon-laba
        padding: 2px;
</style>
