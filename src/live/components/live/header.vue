<template>
  <!-- live header -->
  <div class="live-header">
    <span class="title" v-if="!isOwner">听课指南</span>
    <span class="title clearfix" v-if="isOwner">
      授课指南
      <a class="handle-fold" href="javascript:;" @click="toggleFold">{{isFold?"展开":"折叠"}}</a>
    </span>
    <ul class="header-notice" v-if="!isOwner">
      <li>可展开讨论区与其他学员交流</li>
      <li>语音正在播放时，点击&nbsp;<i class="iconfont icon-laba"></i> 可定位到播放位置</li>
    </ul>
    <ul class="header-notice" v-if="isOwner" :class="{'l-unfold':isFold}">
      <li>授课内容不得违反国家法律法规，易灵微课可能在未告知的情况下配合有关部门进行审查</li>
      <li>课堂分为授课区和讨论区，授课区供讲师发布课程内容，讨论区供学员交流讨论</li>
      <li>授课语音最长为3分钟，为保证录音质量，请准备好麦克风并选择安静的环境</li>
      <li>发送的图片最大为5M，截图可直接在输入区粘贴发送</li>
      <li>授课过程中，超过1小时未发布新消息，视为授课异常。课程将被下架，已报名的学员仍可见</li>
      <li>授课结束，可选择进入课后交流状态或直接结束课程
        <ul>
          <li style="list-style-type: circle;">开启课后交流可继续与学员交流与讨论，或补充课程内容</li>
          <li style="list-style-type: circle;">课后交流默认时长为72小时，此期间讲师可直接结束授课</li>
          <li style="list-style-type: circle;">结束课程则意味着关闭所有发言功能，课程进入回放模式</li>
        </ul>
      </li>
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
        'lessonInfo',
      ]),
    },
    data() {
      return {
        isFold: true,
      };
    },
    created() {
      this.isFold = (this.lessonInfo.form == 'im') ? true : false;
    },
    methods: {
      toggleFold() {
        this.isFold = !this.isFold;
      },
    },
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";

  .title
    .handle-fold
      float: right;
      color: #12b7f5;
      text-decoration: none;
  .header-notice
    .icon-laba
      padding: 5px;
      color: #fff;
      background: #12b7f5;
      border-radius: 50%;
      -webkit-border-radius: 50%;
      px2px(font-size, 32px);
    &.l-unfold
      display: none;
  .is-pc
    .header-notice
      .icon-laba
        padding: 2px;
</style>
