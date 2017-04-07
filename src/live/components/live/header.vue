<template>
  <!-- live header -->
  <div class="live-header">
    <span class="title">听课指南</span>
    <ul>
      <li>听不到声音请往下翻，点击语音即可播放，并确认手机没有静音。</li>
      <li>哈哈哈哈</li>
      <li>哈哈</li>
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

<style lang="stylus" rel="stylesheet/stylus">

</style>
