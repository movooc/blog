<template>
  <!-- show-image -->
  <div class="show-image" v-if="show">
    <div class="img-box" @click="hide">
      <img :src="img" />
    </div>
  </div>
</template>

<script>
  export default
  {
    name: 'show-image',
    props: {
      show: {
        type: Boolean
      },
      img: {
        type: String
      }
    },
    data() {
      return {

      };
    },
    methods: {
      hide() {
        this.$parent.showImg = false;
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .show-image
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    z-index: 12;
    .img-box
      display: flex;
      height: 100%;
      justify-content: center;
      -webkit-justify-content: center;
      align-items:center;
      -webkit-align-items:center;
      img
        width: 80%;
  .is-pc
    .show-image
      .img-box
        img
          width: auto;
</style>
