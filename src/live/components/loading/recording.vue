<template>
  <div class="loading" v-show="show">
    <div class="loader-inner ball-pulse">
      <div></div>
      <div></div>
      <div></div>
      <div>录音中</div>
    </div>
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
    created(){
      //console.log(this);
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'index.styl';
</style>
