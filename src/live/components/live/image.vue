<template>
  <!-- show-image -->
  <div class="show-image">
    <div class="img-box" @click="hide">
      <img id="pinchImg" :src="img" />
    </div>
  </div>
</template>

<script>
  import AlloyFinger from 'AlloyFinger';
  var pinchImg = null;

  export default
  {
    name: 'show-image',
    props: {
//      show: {
//        type: Boolean
//      },
      img: {
        type: String
      }
    },
    data() {
      return {
        initScale:1,
      };
    },
    mounted() {
      if(!pinchImg){
        pinchImg = document.getElementById("pinchImg");
      }
      // 初始化
      try{
        if(isPC) {
          console.log('isPC');
        }else {
          new AlloyFinger(pinchImg, {
            multipointStart: () => {
              //initScale = pinchImg.scaleX;
            },
            pinch: (evt) => {
              let scale = this.initScale * evt.zoom;
              pinchImg.style.transform = `scale(${scale}, ${scale})`;
              //pinchImg.scaleX = pinchImg.scaleY = initScale * evt.scale;
            }
          });
        }
      }catch(e){}
    },
    methods: {
      hide() {
        this.initScale = 1;
        this.$parent.showImg = false;
        pinchImg.style.transform = `scale(${this.initScale}, ${this.initScale})`;
      },
      mouseWheel(i) {
        let zoom = parseInt(i.style.zoom,10)||100;
        zoom += event.wheelDelta / 12;
        if(zoom > 0)
          i.style.zoom=zoom+'%';
        return false;
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
        width: 50%;
  .is-pc
    .show-image
      .img-box
        img
          width: auto;
          min-width: 300px;
</style>
