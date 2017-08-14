<template>
  <div class="ad" v-show="show">
    <div class="loader-inner ball-pulse">
      <div>广告时间{{show}}</div>
    </div>
  </div>
</template>

<script>
    export default{
      name: 'v-ad',
      props: {
        show: {
          type: null,
        },
      },
      methods: {
      },
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  .ad
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 30;
    width: 100%
    height: 100%;
    background-color: #fff;
    opacity: 1;
    .ball-pulse
      position: absolute
      top: 50%
      left: 45%
      div
        margin: 2px;
        display: inline-block;

</style>
