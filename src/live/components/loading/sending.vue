<template>
  <div class="loading" v-show="show">
    <div class="loader-inner ball-pulse">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="is-sending">录音正在发送</div>
  </div>
</template>
<script>
  export default {
    name: 'sending',
    props: {
      show: {
        type: Boolean
      }
    },
    created(){
      //console.log(this);
    },
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import 'index.styl';
  .loading
    top: 50%;
    height: 150px;
    .ball-pulse
      top: 0;
  .is-sending
    position: absolute;
    top: 64%;
    left: 45%;
    color: #03a9f4;
    px2px(font-size, 32px);
</style>
