<template>
  <!-- live header -->
  <div class="live-header">
    <span class="title">听课指南</span>
    <ul class="header-notice" v-if="!isOwner">
      <li>可展开讨论区与其他学员交流</li>
      <li>语音正在播放时，点击&nbsp;<i class="iconfont icon-laba"></i> 可定位到播放位置</li>
    </ul>
    <ul class="header-notice" v-if="isOwner">
      <li>授课内容不得违反国家法律法规</li>
      <li>课程审核通过后即开放报名，修改课程名称、介绍需要再次审核</li>
      <li>授课区和讨论区，学员可在讨论区交流</li>
      <li>课程结束后，可选择是否开放课后交流时间，与学员进一步探讨</li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default
  {
    name: 'l-header',
    computed: {
      ...mapState([
        'isOwner',
      ])
    },
    methods: {
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
