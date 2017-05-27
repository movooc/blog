<template>
  <div class="loading" v-show="show">
    <div class="loader-inner ball-pulse">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="is-recording">正在录音</div>
    <div class="is-recording cancle"><button @click="cancleRecording">取消录音</button></div>
  </div>
</template>
<script>
  export default {
    name: 'recording',
    props: {
      show: {
        type: Boolean
      }
    },
    created() {
      //console.log(this);
    },
    methods: {
      cancleRecording(){
        this.$store.commit('UPDATE_CANCLE_RECORD', true);
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import 'index.styl';
  .loading
    z-index: 4;
    px2px(font-size, 32px);
  .is-recording
    position: absolute;
    top: 60%;
    left: 46%;
    color: #03a9f4;
    &.cancle
      top: 65%;
</style>
